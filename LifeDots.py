import numpy as np
import pygame
import sched
import time
import multiprocessing as mp
from Dot import Dot
from config import *

def brush(foodGrid,position):
	x = int(position[0]/CELL_SIZE)
	y = int(position[1]/CELL_SIZE)
	bigFoodGrid = np.zeros(np.array(foodGrid.shape)+BRUSH_RADIUS*2)
	bigFoodGrid[BRUSH_RADIUS:-BRUSH_RADIUS,BRUSH_RADIUS:-BRUSH_RADIUS] = foodGrid
	bigFoodGrid[x:x+BRUSH_RADIUS*2+1,y:y+BRUSH_RADIUS*2+1] = BRUSH_QUANTITY
	return bigFoodGrid[BRUSH_RADIUS:-BRUSH_RADIUS,BRUSH_RADIUS:-BRUSH_RADIUS]

def rain(foodGrid,foodInfo):
	if foodInfo[0] == TICKS_BETWEEN_RAIN:
		s = np.random.randint(MIN_FOOD_QUANTITY,MAX_FOOD_QUANTITY+1,FOOD_PER_RAIN)
		r = np.random.randint(0,GRID_SIZE,FOOD_PER_RAIN)
		c = np.random.randint(0,GRID_SIZE,FOOD_PER_RAIN)
		foodGrid[r,c] = s
		foodInfo[0] = 0
	else:
		foodInfo[0] += 1
	return foodGrid,foodInfo
	
def hotSpot(foodGrid,foodInfo):
	if MOVE_HOTSPOT:
		nextRadius = int(HOTSPOT_RADIUS*foodInfo[6]/HOTSPOT_TICKS)
		currentRadius = HOTSPOT_RADIUS-nextRadius
		if foodInfo[6] != HOTSPOT_TICKS:
			if foodInfo[5] != currentRadius:
				foodGrid[int(foodInfo[1]-foodInfo[5]):int(foodInfo[1]+foodInfo[5]+1),int(foodInfo[2]-foodInfo[5]):int(foodInfo[2]+foodInfo[5]+1)] = 0
			foodGrid[int(foodInfo[1]-currentRadius):int(foodInfo[1]+currentRadius+1),int(foodInfo[2]-currentRadius):int(foodInfo[2]+currentRadius+1)] = HOTSPOT_QUANTITY
			foodGrid[int(foodInfo[3]-nextRadius):int(foodInfo[3]+nextRadius+1),int(foodInfo[4]-nextRadius):int(foodInfo[4]+nextRadius+1)] = HOTSPOT_QUANTITY
			foodInfo[5] = currentRadius
			foodInfo[6] += 1
		else:
			foodGrid[int(foodInfo[1]-1):int(foodInfo[1]+2),int(foodInfo[2]-1):int(foodInfo[2]+2)] = 0
			foodGrid[int(foodInfo[3]-nextRadius):int(foodInfo[3]+nextRadius+1),int(foodInfo[4]-nextRadius):int(foodInfo[4]+nextRadius+1)] = HOTSPOT_QUANTITY
			foodInfo[1] = foodInfo[3]
			foodInfo[2] = foodInfo[4]
			foodInfo[3] = np.random.randint(HOTSPOT_RADIUS,GRID_SIZE-HOTSPOT_RADIUS)
			foodInfo[4] = np.random.randint(HOTSPOT_RADIUS,GRID_SIZE-HOTSPOT_RADIUS)
			foodInfo[5] = HOTSPOT_RADIUS
			foodInfo[6] = 0
	else:
		foodGrid[int(foodInfo[1]-HOTSPOT_RADIUS):int(foodInfo[1]+HOTSPOT_RADIUS+1),int(foodInfo[2]-HOTSPOT_RADIUS):int(foodInfo[2]+HOTSPOT_RADIUS+1)] = HOTSPOT_QUANTITY
	return foodGrid,foodInfo
	
def move(dotList,foodGrid,dotGrid):
	newDotGrid = np.zeros((GRID_SIZE,GRID_SIZE))
	for dot in dotList:
		dot.move(foodGrid,dotGrid)
		if dot.currentSize < 0:
			dotList.remove(dot)
		else:
			newDotGrid[dot.row,dot.column] += dot.currentSize
	return dotList,newDotGrid

def consume(dotList,foodGrid,dotGrid):
	newDotGrid = np.zeros((GRID_SIZE,GRID_SIZE))
	for dot in dotList:
		otherDots = dotGrid[dot.row,dot.column]-dot.currentSize
		if dot.currentSize > otherDots:
			dot.currentSize += otherDots*ENERGY_TRANSFER
			dot.currentSize += foodGrid[dot.row,dot.column]
			foodGrid[dot.row,dot.column] = 0
			newDotGrid[dot.row,dot.column] += dot.currentSize
		else:
			dotList.remove(dot)
	return dotList,foodGrid,newDotGrid
	
def multiply(dotList):
	for dot in dotList:
		while dot.currentSize > dot.maxSize:
			newDot = dot.split(GRID_SIZE)
			if newDot != []:
				dotList.append(newDot)
	return dotList
	
def tick(sc,foodGrid,foodInfo,dotGrid,dotList): 
	# add the food
	if FEED_WITH_RAIN:
		foodGrid,foodInfo = rain(foodGrid,foodInfo)
	if FEED_WITH_HOTSPOT:
		foodGrid,foodInfo = hotSpot(foodGrid,foodInfo)
	
	# move every dot, this can be multi-threaded by splitting up and re-joining
	# the dotList and adding all the dotGrids together
	dotList,dotGrid = move(dotList,foodGrid,dotGrid)
	
	# check what gets eaten, this can be multi-threaded by splitting up and rejoining
	# the dotList, taking the minimum of all the food grids, and adding the dotGrids together
	dotList,foodGrid,dotGrid = consume(dotList,foodGrid,dotGrid)
	
	# split the dots that have grown enough, this can be multi-threaded by splitting
	# up and rejoining the dotList
	dotList = multiply(dotList)
	
	# handle user interactions
	for event in pygame.event.get():
		if event.type == pygame.MOUSEBUTTONDOWN:
			if pygame.mouse.get_pressed()[0] and FEED_WITH_BRUSH:
				foodInfo[7] = 1
				foodGrid = brush(foodGrid,pygame.mouse.get_pos())
			if RIGHT_CLICK_RECOLOR and pygame.mouse.get_pressed()[2]:
				for dot in dotList:
					dot.cellColor = ((np.random.randint(256)+DOT_BRIGHTNESS)/2,(np.random.randint(256)+DOT_BRIGHTNESS)/2,(np.random.randint(256)+DOT_BRIGHTNESS)/2)
		elif event.type == pygame.MOUSEBUTTONUP:
			if not pygame.mouse.get_pressed()[0]:
				foodInfo[7] = 0
		elif event.type == pygame.MOUSEMOTION and foodInfo[7] == 1:
			foodGrid = brush(foodGrid,pygame.mouse.get_pos())
		elif event.type == pygame.VIDEORESIZE:
			something = 'replace this with actual code later if you want'
		elif event.type == pygame.QUIT:
			pygame.quit()
			exit()
		else:
			None
		
	# draw everything
	for column in range(0,GRID_SIZE):
		for row in range(0,GRID_SIZE):
			if foodGrid[row,column] == 0:
				pygame.draw.rect(screen,VOID_COLOR,(row*CELL_SIZE,column*CELL_SIZE,CELL_SIZE,CELL_SIZE))
			else:
				pygame.draw.rect(screen,FOOD_COLOR,(row*CELL_SIZE,column*CELL_SIZE,CELL_SIZE,CELL_SIZE))
	for dot in dotList:
		pygame.draw.rect(screen,dot.cellColor,(dot.row*CELL_SIZE,dot.column*CELL_SIZE,CELL_SIZE,CELL_SIZE))
	pygame.display.flip()
	
	# check for end state
	if dotList != []:
		sch.enter(1/UPDATE_RATE,1,tick,(sch,foodGrid,foodInfo,dotGrid,dotList,))

if __name__ == '__main__':
	# setup the display
	pygame.init()
	screen = pygame.display.set_mode((CELL_SIZE*GRID_SIZE,CELL_SIZE*GRID_SIZE),pygame.RESIZABLE)
	pygame.display.set_caption("Life Dots")
	background = pygame.Surface(screen.get_size())
	background.fill(VOID_COLOR)

	# create storage
	foodGrid = np.zeros((GRID_SIZE,GRID_SIZE))
	foodInfo = np.zeros(8)
	dotGrid = np.zeros((GRID_SIZE,GRID_SIZE))
	dotList = []

	# create starting food conditions
	if FEED_WITH_RAIN:
		foodInfo[0] = 0
	if FEED_WITH_HOTSPOT:
		foodInfo[1] = np.random.randint(HOTSPOT_RADIUS,GRID_SIZE-HOTSPOT_RADIUS)
		foodInfo[2] = np.random.randint(HOTSPOT_RADIUS,GRID_SIZE-HOTSPOT_RADIUS)
		foodInfo[3] = np.random.randint(HOTSPOT_RADIUS,GRID_SIZE-HOTSPOT_RADIUS)
		foodInfo[4] = np.random.randint(HOTSPOT_RADIUS,GRID_SIZE-HOTSPOT_RADIUS)
		foodInfo[5] = HOTSPOT_RADIUS
		foodInfo[6] = 0
	if FEED_WITH_BRUSH:
		foodInfo[7] = 0

	# create starting dots
	for i in range(0,int(GRID_SIZE*GRID_SIZE*SPAWN_PERCENT)):
		cc = ((np.random.randint(256)+DOT_BRIGHTNESS)/2,(np.random.randint(256)+DOT_BRIGHTNESS)/2,(np.random.randint(256)+DOT_BRIGHTNESS)/2)
		ms = np.random.randint(MIN_SPAWN_SIZE,MAX_SPAWN_SIZE+1)
		bs = np.random.randint(1,np.floor(ms/2+1))
		s = np.random.randint(MIN_SPAWN_SPEED,MAX_SPAWN_SPEED+1)
		p = np.random.randint(MIN_SPAWN_PERCEPTION,MAX_SPAWN_PERCEPTION+1)
		r = np.random.randint(0,GRID_SIZE)
		c = np.random.randint(0,GRID_SIZE)
		hl = []
		for i in range(0,np.random.randint(MIN_SPAWN_DEPTH,MAX_SPAWN_DEPTH)):
			hl.append(np.random.randint(MIN_SPAWN_NEURONS,MAX_SPAWN_NEURONS))
		dotList.append(Dot(cc,ms,ms,bs,s,p,r,c,hl))
		dotGrid[r,c] += ms
		
	# start the simulation
	sch = sched.scheduler(time.time,time.sleep)
	sch.enter(1/UPDATE_RATE,1,tick,(sch,foodGrid,foodInfo,dotGrid,dotList,))
	sch.run()
import numpy as np
from config import *

def edgeCheck(r,c,GRID_SIZE):
	row = r
	column = c
	if r == -1:
		row = GRID_SIZE-1
	elif r == GRID_SIZE:
		row = 0
	if c == -1:
		column = GRID_SIZE-1
	elif c == GRID_SIZE:
		column = 0
	return int(row),int(column)

class Dot:

	def __init__(self,cc,cs,ms,bs,s,p,r,c,hl,w=[]):
		self.cellColor = cc
		self.currentSize = cs
		self.maxSize = ms
		self.babySize = bs
		self.speed = s
		self.count = 0
		self.perception = p
		self.row = r
		self.column = c
		self.hiddenLayers = hl
		self.weights = list(w)
		if self.weights == []:
			if self.hiddenLayers != []:
				self.weights.append(np.random.rand((self.perception*2+1)*(self.perception*2+1)*2,self.hiddenLayers[0]))
				for i in range(1,len(self.hiddenLayers)):
					self.weights.append(np.random.rand(self.hiddenLayers[i-1],self.hiddenLayers[i]))
				self.weights.append(np.random.rand(self.hiddenLayers[-1],9))
			else:
				self.weights.append(np.random.rand((self.perception*2+1)*(self.perception*2+1)*2,9))

	def move(self,foodGrid,dotGrid):
		self.count += 1
		if self.count >= self.speed:
			self.count = 0
			self.currentSize -= np.amax([np.floor(self.maxSize/MOVES_UNTIL_DEATH),1])
			bigFoodGrid = np.zeros(np.array(foodGrid.shape)+self.perception*2)
			bigFoodGrid[self.perception:-self.perception,self.perception:-self.perception] = foodGrid
			bigFoodGrid[self.perception:-self.perception,0:self.perception] = foodGrid[:,-self.perception:]
			bigFoodGrid[self.perception:-self.perception,-self.perception:] = foodGrid[:,0:self.perception]
			bigFoodGrid[0:self.perception,:] = bigFoodGrid[-2*self.perception:-self.perception,:]
			bigFoodGrid[-self.perception:,:] = bigFoodGrid[self.perception:2*self.perception,:]
			foodPerception = bigFoodGrid[self.row:self.row+self.perception*2+1,self.column:self.column+self.perception*2+1]
			foodPerception = foodPerception.reshape(1,foodPerception.size)
			bigDotGrid = np.zeros(np.array(dotGrid.shape)+self.perception*2)
			bigDotGrid[self.perception:-self.perception,self.perception:-self.perception] = dotGrid
			bigDotGrid[self.perception:-self.perception,0:self.perception] = dotGrid[:,-self.perception:]
			bigDotGrid[self.perception:-self.perception,-self.perception:] = dotGrid[:,0:self.perception]
			bigDotGrid[0:self.perception,:] = bigDotGrid[-2*self.perception:-self.perception,:]
			bigDotGrid[-self.perception:,:] = bigDotGrid[self.perception:2*self.perception,:]
			dotPerception = bigDotGrid[self.row:self.row+self.perception*2+1,self.column:self.column+self.perception*2+1]
			dotPerception = dotPerception.reshape(1,dotPerception.size)
			direction = np.append(foodPerception,dotPerception)
			direction = np.reshape(direction,(1,direction.size))
			for i in range(0,len(self.hiddenLayers)+1):
				direction = np.maximum(np.dot(direction,self.weights[i]),0)
			direction = np.argmax(direction)
			self.row += np.floor(direction/3)-1
			self.column += direction%3-1
			self.row,self.column = edgeCheck(self.row,self.column,dotGrid.shape[0])
			
	def split(self,GRID_SIZE):
		self.currentSize -= self.babySize
		cc = self.cellColor
		cs = self.babySize
		ms = self.maxSize
		bs = self.babySize
		s = self.speed
		r = self.row + np.random.choice([0,1,-1])
		c = self.column + np.random.choice([0,1,-1])
		r,c = edgeCheck(r,c,GRID_SIZE)
		p = self.perception
		hl = list(self.hiddenLayers)
		w = list(self.weights)
		if MAXSIZE_MUTATION:
			ms += np.random.normal(MAXSIZE_MU,MAXSIZE_SIGMA)
		if BABYSIZE_MUTATION:
			bs += np.random.normal(BABYSIZE_MU,BABYSIZE_SIGMA)
		if SPEED_MUTATION:
			s += np.random.normal(SPEED_MU,SPEED_SIGMA)
		if PERCEPTION_MUTATION:
			p += np.random.choice([0,1,-1],p=[1-PERCEPTION_GROW_CHANCE-PERCEPTION_SHRINK_CHANCE,PERCEPTION_GROW_CHANCE,PERCEPTION_SHRINK_CHANCE])
			if p > self.perception:
				input = []
				for column in w[0].T:
					oldFood = column[:(self.perception*2+1)*(self.perception*2+1)]
					newFood = np.zeros((p*2+1,p*2+1))
					newFood[1:-1,1:-1] = oldFood.reshape((self.perception*2+1,self.perception*2+1))
					newFood = newFood.reshape((newFood.size,1))
					oldDots = column[(self.perception*2+1)*(self.perception*2+1):]
					newDots = np.zeros((p*2+1,p*2+1))
					newDots[1:-1,1:-1] = oldDots.reshape((self.perception*2+1,self.perception*2+1))
					newDots = newDots.reshape((newDots.size,1))
					input.append(np.vstack((newFood,newDots)))
				w[0] = np.hstack(input)
			if p < self.perception:
				input = []
				for column in w[0].T:
					oldFood = column[:(self.perception*2+1)*(self.perception*2+1)]
					oldFood = oldFood.reshape((self.perception*2+1,self.perception*2+1))
					newFood = oldFood[1:-1,1:-1]
					newFood = newFood.reshape((newFood.size,1))
					oldDots = column[(self.perception*2+1)*(self.perception*2+1):]
					oldDots = oldDots.reshape((self.perception*2+1,self.perception*2+1))
					newDots = oldDots[1:-1,1:-1]
					newDots = newDots.reshape((newDots.size,1))
					input.append(np.vstack((newFood,newDots)))
				w[0] = np.hstack(input)
		if NEURON_MUTATION:
			for i in range(0,len(hl)):
				hl[i] += np.random.choice([0,1,-1],p=[1-NEURON_GROW_CHANCE-NEURON_SHRINK_CHANCE,NEURON_GROW_CHANCE,NEURON_SHRINK_CHANCE])
				if hl[i] > self.hiddenLayers[i]:
					w[i] = np.hstack((w[i],np.zeros((w[i].shape[0],1))))
					w[i+1] = np.vstack((w[i+1],np.zeros((1,w[i+1].shape[1]))))
				elif hl[i] < self.hiddenLayers[i]:
					w[i] = w[i][:,:-1]
					w[i+1] = w[i+1][:-1,:]
		if THOUGHT_MUTATION:
			for i in range(0,len(w)):
				w[i] += np.random.normal(THOUGHT_MU,THOUGHT_SIGMA,w[i].shape)
		if ms <= 0:
			return []
		if bs <= 0:
			return []
		if bs >= ms:
			return []
		if s < 0:
			return []
		if p <= 0:
			return []
		for n in hl:
			if n == 0:
				return []
		return Dot(cc,cs,ms,bs,s,p,r,c,hl,w)
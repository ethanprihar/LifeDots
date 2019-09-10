# Process Parameters
MAX_THREADS = 4

# Display Parameters
UPDATE_RATE = 50 # frequency in Hz of the ticks
VOID_COLOR = (0,0,0) # RGB color value
FOOD_COLOR = (255,255,255) # RGB color value
DOT_BRIGHTNESS = 255 # 0-255
CELL_SIZE = 10 # how many pixels the length and height of a cell is
RIGHT_CLICK_RECOLOR = True # whether or not you can right click to reassign random colors to the remaining life dots

# Environment Parameters
GRID_SIZE = 100 # how many cells in one grid dimension
FEED_WITH_BRUSH = True # whether or not to add food via user input
FEED_WITH_RAIN = False # whether or not to add food using the rain method
FEED_WITH_HOTSPOT = True # whether of not to add food using the hotspot method

# Brush Feed Method Parameters
BRUSH_RADIUS = 5 # how many cells out from the center the food is drawn
BRUSH_QUANTITY = 10 # how much food each cell has after being painted

# Rain Feed Method Parameters
TICKS_BETWEEN_RAIN = 10 # how many ticks to wait before raining again
FOOD_PER_RAIN = 2 # number of food cells added every tick
MIN_FOOD_QUANTITY = 1000 # smallest amount of food added to a cell on a tick
MAX_FOOD_QUANTITY = 1000 # largest amount of food added to a cell on a tick

# Hotspot Feed Method Parameters
HOTSPOT_RADIUS = 10 # spot radius measured in cells
HOTSPOT_QUANTITY = 10 # how much food each cell in the spot will have
MOVE_HOTSPOT = True # whether or not to randomly move the spot or keep it in the same space
HOTSPOT_TICKS = 250 # how many ticks a spot lasts for if it's moving

# Dot Spawning Parameters
SPAWN_PERCENT = 0.01 # percent of total grid populated with dots at start
MIN_SPAWN_SIZE = 100 # smallest dot on start
MAX_SPAWN_SIZE = 500 # biggest dot on start
MIN_SPAWN_SPEED = 1 # fastest dot on start
MAX_SPAWN_SPEED = 3 # slowest dot on start
MIN_SPAWN_PERCEPTION = 3 # smallest perception radius on start
MAX_SPAWN_PERCEPTION = 8 # largest perception radius on start
MIN_SPAWN_DEPTH = 0 # smallest number of hidden layers on start
MAX_SPAWN_DEPTH = 4 # largest number of hidden layers on start
MIN_SPAWN_NEURONS = 1 # smallest nodes in a hidden layer on start
MAX_SPAWN_NEURONS = 32 # largest nodes in a hidden layer on start

# Dot Parameters
ENERGY_TRANSFER = 0.5 # percent of consumed dot size transfer to consumer
MOVES_UNTIL_DEATH = 100 # the maximum number of times a dot can move without eating before it dies

# Dot Genetics
MAXSIZE_MUTATION = True # can the dots maximum size evolve
MAXSIZE_MU = 0 # average of normal distribution  that is sampled from to determine mutation magnitude
MAXSIZE_SIGMA = 0.5 # standard deviation of normal distribution that is sampled from to determine mutation magnitude
BABYSIZE_MUTATION = True # can the dots baby size evolve
BABYSIZE_MU = 0 # average of normal distribution  that is sampled from to determine mutation magnitude
BABYSIZE_SIGMA = 0.5 # standard deviation of normal distribution that is sampled from to determine mutation magnitude
SPEED_MUTATION = True # can the dots speed evolve
SPEED_MU = 0 # average of normal distribution  that is sampled from to determine mutation magnitude
SPEED_SIGMA = 0.5 # standard deviation of normal distribution that is sampled from to determine mutation magnitude
PERCEPTION_MUTATION = True # can the dots perception evolve
PERCEPTION_GROW_CHANCE = 0.01 # percent chance the dot's perception will grow
PERCEPTION_SHRINK_CHANCE = 0.01 # percent chance the dot's perception will shrink
NEURON_MUTATION = True # can the number of nodes in the hidden layers of the dots neural net evolve
NEURON_GROW_CHANCE = 0.0025 # percent chance the dot's number of nodes in each layer will grow
NEURON_SHRINK_CHANCE = 0.0025 # percent chance the dot's number of nodes in each layer will shrink
THOUGHT_MUTATION = True # can the dots neural net weights evolve
THOUGHT_MU = 0 # average of normal distribution  that is sampled from to determine mutation magnitude
THOUGHT_SIGMA = 0.05 # standard deviation of normal distribution that is sampled from to determine mutation magnitude
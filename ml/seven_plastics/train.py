import matplotlib.pyplot as plt
import numpy as np
import pandas as pd 
import tensorflow as tf
from tensorflow.keras.preprocessing import image_dataset_from_directory
tf.__version__

data_directory = "seven_plastics/"

train_ds = image_dataset_from_directory(
  data_directory,
  validation_split=0.2,
  subset="training",
  seed=123,
  image_size=(200, 200),
  batch_size=32)
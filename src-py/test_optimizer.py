# my_optimizer.py

import numpy as np

def optimize(params, callback):
    actual_data = np.array([1, 2, 3, 4])  # Real dataset
    for i in range(10):
        synthetic_data = actual_data * np.random.uniform(0.9, 1.1, size=actual_data.shape)
        diff = np.abs(actual_data - synthetic_data)
        callback(actual_data.tolist(), synthetic_data.tolist(), diff.tolist())
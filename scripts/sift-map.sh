#!/bin/bash
# Install Sift-Map mapper into node_modules

# Determine location of node_modules
if [ -d ../../node_modules ]
then
  cd ./node_modules && ln -s ../mapper/siftmap
elif [ -d ./node_modules ]
then
  cd ../../node_modules && ln -s ./sift/mapper/siftmap
fi

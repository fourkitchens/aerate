#!/bin/bash
# Install Aerate-Map mapper into node_modules

# Determine location of node_modules
if [ -d ../../node_modules ]
then
  cd ../../node_modules && ln -s ./aerate/mapper/aeratemap
elif [ -d ./node_modules ]
then
  cd ./node_modules && ln -s ../mapper/aeratemap
fi

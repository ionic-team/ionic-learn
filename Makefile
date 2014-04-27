all: clean nanoc
clean: 
	rm -rf output/ tmp/
nanoc:
	nanoc


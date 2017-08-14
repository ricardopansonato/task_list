

# How do I use it?
      
1. install node.js dependencies

		npm install
		
2. generate webpack bundle from the root of the project

		webpack
		
3. install the app from the root of the project directory

		pip install --editable .
		
4. tell flask about the right application:

		export FLASK_APP=todolist
		
5. fire up a shell and run this:

		flask initdb
		
6. now you can run minitwit:

		flask run

7. the application will greet you on
		
		http://localhost:5000/

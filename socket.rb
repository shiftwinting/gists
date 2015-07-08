require 'socket'

# Create the listener socket.
server = TCPServer.new(4481)

# Enter an endless loop of accepting and
# handling connections.
Socket.accept_loop(server) do |connection|
  connection.write(connection.read)
  connection.close
end

import * as io from 'socket.io-client';

export default class Socket {
  static _instance: Socket | undefined;
  private _socket: SocketIOClient.Socket | undefined;
  private _userId: string;

  static getInstance(userId?: string): Socket | undefined {
    if(this._instance)
      return this._instance;

    if(userId) {
      this._instance = new Socket(userId);
    }

    return this._instance;
  }

  destroy(): void {
    Socket._instance = undefined;
    this._socket.disconnect();
  }

  protected constructor(userId: string) {
    this._userId = userId;
    this._socket = io();
    this.configure();
  }

  configure() {
    console.log('running configuration...');
    // Attach all controllers to the socket

    this._socket.emit('signin', this._userId);

    this._socket.on('receive', (message: any) => {
      console.log(message);
    });
  }

  send(message: any) {
    this._socket.emit('message', message);
  }
}
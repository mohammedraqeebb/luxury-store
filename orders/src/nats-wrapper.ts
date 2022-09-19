import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private _client?: Stan;
  get client() {
    if (!this._client) {
      throw new Error('error in connecting');
    }
    return this._client;
  }
  connect(clusterId: string, clientId: string, url: string): Promise<void> {
    this._client = nats.connect(clusterId, clientId, {
      url,
    });
    return new Promise<void>((resolve, reject) => {
      this.client.on('connect', () => {
        console.log('connected to nats');
        return resolve();
      });
      this.client.on('error', (err) => {
        console.log('error in connecting nats ');
        return reject(err);
      });
    });
  }
}

export const natsWrapper = new NatsWrapper();

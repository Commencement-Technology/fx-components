export interface Pool {
  poolId: string;
  connectionDate: string | number; // UTC : date user connected as friend
  location: string;
}

export const mockPoolData: Pool = {
  poolId: 'Pool_0982345454',
  connectionDate: new Date().valueOf(),
  location: '15 miles',
};
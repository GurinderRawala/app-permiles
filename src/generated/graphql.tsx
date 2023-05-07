export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A special custom Scalar type for Dates that converts to a ISO formatted string */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Date: any;
};

/** Mutating data */
export type Mutation = {
  readonly addBroker: Maybe<Broker>;
  readonly addClient: Maybe<Client>;
  readonly addDriver: Maybe<Driver>;
  readonly addLoad: Maybe<Load>;
  readonly addPayroll: Maybe<Payroll>;
  readonly addTrailer: Maybe<Trailer>;
  readonly addTrip: Maybe<Trip>;
  readonly addTruck: Maybe<Truck>;
  readonly addUserAccount: Maybe<UserAccount>;
  readonly updateBroker: Maybe<Broker>;
  readonly updateDriver: Maybe<Driver>;
  readonly updateLoad: Maybe<Load>;
  readonly updatePayroll: Maybe<Payroll>;
  readonly updateTrailer: Maybe<Trailer>;
  readonly updateTrip: Maybe<Trip>;
  readonly updateTruck: Maybe<Truck>;
  readonly updateUserAccount: Maybe<UserAccount>;
};

/** Mutating data */
export type MutationAddBrokerArgs = {
  input: InputMaybe<BrokerInput>;
};

/** Mutating data */
export type MutationAddClientArgs = {
  input: InputMaybe<ClientInput>;
};

/** Mutating data */
export type MutationAddDriverArgs = {
  input: InputMaybe<DriverInput>;
};

/** Mutating data */
export type MutationAddLoadArgs = {
  input: InputMaybe<LoadModifiedInput>;
};

/** Mutating data */
export type MutationAddPayrollArgs = {
  input: InputMaybe<PayrollInput>;
};

/** Mutating data */
export type MutationAddTrailerArgs = {
  input: InputMaybe<TrailerInput>;
};

/** Mutating data */
export type MutationAddTripArgs = {
  input: InputMaybe<TripModifiedInput>;
};

/** Mutating data */
export type MutationAddTruckArgs = {
  input: InputMaybe<TruckInput>;
};

/** Mutating data */
export type MutationAddUserAccountArgs = {
  input: InputMaybe<UserAccountInput>;
};

/** Mutating data */
export type MutationUpdateBrokerArgs = {
  id: InputMaybe<Scalars['String']>;
  input: InputMaybe<BrokerInput>;
};

/** Mutating data */
export type MutationUpdateDriverArgs = {
  id: InputMaybe<Scalars['String']>;
  input: InputMaybe<DriverInput>;
};

/** Mutating data */
export type MutationUpdateLoadArgs = {
  id: InputMaybe<Scalars['String']>;
  input: InputMaybe<LoadInput>;
};

/** Mutating data */
export type MutationUpdatePayrollArgs = {
  id: InputMaybe<Scalars['String']>;
  input: InputMaybe<PayrollInput>;
};

/** Mutating data */
export type MutationUpdateTrailerArgs = {
  id: InputMaybe<Scalars['String']>;
  input: InputMaybe<TrailerInput>;
};

/** Mutating data */
export type MutationUpdateTripArgs = {
  id: InputMaybe<Scalars['String']>;
  input: InputMaybe<TripInput>;
};

/** Mutating data */
export type MutationUpdateTruckArgs = {
  id: InputMaybe<Scalars['String']>;
  input: InputMaybe<TruckInput>;
};

/** Mutating data */
export type MutationUpdateUserAccountArgs = {
  id: InputMaybe<Scalars['String']>;
  input: InputMaybe<UserAccountInput>;
};

/** Query data from graphql */
export type Query = {
  readonly brokers: Maybe<ReadonlyArray<Maybe<Broker>>>;
  readonly clients: Maybe<ReadonlyArray<Maybe<Client>>>;
  readonly drivers: Maybe<ReadonlyArray<Maybe<Driver>>>;
  readonly loads: Maybe<ReadonlyArray<Maybe<Load>>>;
  readonly payrolls: Maybe<ReadonlyArray<Maybe<Payroll>>>;
  readonly trailers: Maybe<ReadonlyArray<Maybe<Trailer>>>;
  readonly trips: Maybe<ReadonlyArray<Maybe<Trip>>>;
  readonly trucks: Maybe<ReadonlyArray<Maybe<Truck>>>;
  readonly userAccounts: Maybe<ReadonlyArray<Maybe<UserAccount>>>;
};

/** Query data from graphql */
export type QueryBrokersArgs = {
  orderBy: InputMaybe<Scalars['String']>;
  where: InputMaybe<BrokerInput>;
};

/** Query data from graphql */
export type QueryClientsArgs = {
  orderBy: InputMaybe<Scalars['String']>;
  where: InputMaybe<ClientInput>;
};

/** Query data from graphql */
export type QueryDriversArgs = {
  orderBy: InputMaybe<Scalars['String']>;
  where: InputMaybe<DriverInput>;
};

/** Query data from graphql */
export type QueryLoadsArgs = {
  orderBy: InputMaybe<Scalars['String']>;
  where: InputMaybe<LoadInput>;
};

/** Query data from graphql */
export type QueryPayrollsArgs = {
  orderBy: InputMaybe<Scalars['String']>;
  where: InputMaybe<PayrollInput>;
};

/** Query data from graphql */
export type QueryTrailersArgs = {
  orderBy: InputMaybe<Scalars['String']>;
  where: InputMaybe<TrailerInput>;
};

/** Query data from graphql */
export type QueryTripsArgs = {
  orderBy: InputMaybe<Scalars['String']>;
  where: InputMaybe<TripInput>;
};

/** Query data from graphql */
export type QueryTrucksArgs = {
  orderBy: InputMaybe<Scalars['String']>;
  where: InputMaybe<TruckInput>;
};

/** Query data from graphql */
export type QueryUserAccountsArgs = {
  orderBy: InputMaybe<Scalars['String']>;
  where: InputMaybe<UserAccountInput>;
};

/** Trip information */
export type TripInfoInput = {
  /** The id of the load included in the trip */
  readonly id: Scalars['ID'];
};

/** Trip input fields */
export type TripModifiedInput = {
  /** The driver ID of the assigned driver */
  readonly assignedTo: Scalars['ID'];
  /** The ID of the trip, automatically generated */
  readonly id: InputMaybe<Scalars['ID']>;
  /** State (state: string), CREATED | ASSIGNED | MOVING | DELIVERED | PAID */
  readonly state: Scalars['String'];
  /** Total miles of the trip */
  readonly totalMiles: InputMaybe<Scalars['Float']>;
  /** The trip information */
  readonly tripInfo: ReadonlyArray<InputMaybe<TripInfoInput>>;
};

/** Address information */
export type AddressInput = {
  /** Name of the city */
  readonly city: Scalars['String'];
  /** Name of the country */
  readonly country: InputMaybe<Scalars['String']>;
  /** Postal code for the address important */
  readonly postalCode: Scalars['String'];
  /** Name of the state/province */
  readonly state: Scalars['String'];
  /** Street name */
  readonly streetName: Scalars['String'];
  /** Unit number of bussiness or house number */
  readonly unitNumber: Scalars['String'];
};

export type Broker = {
  readonly city: Scalars['String'];
  readonly clientid: Scalars['String'];
  readonly contactname: Scalars['String'];
  readonly country: Scalars['String'];
  readonly createdAt: Scalars['Date'];
  readonly email: Scalars['String'];
  readonly id: Scalars['String'];
  readonly name: Scalars['String'];
  readonly phone: Scalars['String'];
  readonly postalcode: Scalars['String'];
  readonly province: Scalars['String'];
  readonly streetaddress: Scalars['String'];
  readonly updatedAt: Scalars['Date'];
};

export type BrokerInput = {
  readonly city: InputMaybe<Scalars['String']>;
  readonly clientid: InputMaybe<Scalars['String']>;
  readonly contactname: InputMaybe<Scalars['String']>;
  readonly country: InputMaybe<Scalars['String']>;
  readonly createdAt: InputMaybe<Scalars['Date']>;
  readonly email: InputMaybe<Scalars['String']>;
  readonly id: InputMaybe<Scalars['String']>;
  readonly name: InputMaybe<Scalars['String']>;
  readonly phone: InputMaybe<Scalars['String']>;
  readonly postalcode: InputMaybe<Scalars['String']>;
  readonly province: InputMaybe<Scalars['String']>;
  readonly streetaddress: InputMaybe<Scalars['String']>;
  readonly updatedAt: InputMaybe<Scalars['Date']>;
};

export type Client = {
  readonly city: Scalars['String'];
  readonly contactname: Scalars['String'];
  readonly country: Scalars['String'];
  readonly createdAt: Scalars['Date'];
  readonly email: Scalars['String'];
  readonly id: Scalars['String'];
  readonly isActive: Scalars['String'];
  readonly legalname: Scalars['String'];
  readonly name: Scalars['String'];
  readonly phone: Scalars['String'];
  readonly postalcode: Scalars['String'];
  readonly province: Scalars['String'];
  readonly startdate: Scalars['Date'];
  readonly streetaddress: Scalars['String'];
  readonly updatedAt: Scalars['Date'];
};

export type ClientInput = {
  readonly city: InputMaybe<Scalars['String']>;
  readonly contactname: InputMaybe<Scalars['String']>;
  readonly country: InputMaybe<Scalars['String']>;
  readonly createdAt: InputMaybe<Scalars['Date']>;
  readonly email: InputMaybe<Scalars['String']>;
  readonly id: InputMaybe<Scalars['String']>;
  readonly isActive: InputMaybe<Scalars['String']>;
  readonly legalname: InputMaybe<Scalars['String']>;
  readonly name: InputMaybe<Scalars['String']>;
  readonly phone: InputMaybe<Scalars['String']>;
  readonly postalcode: InputMaybe<Scalars['String']>;
  readonly province: InputMaybe<Scalars['String']>;
  readonly startdate: InputMaybe<Scalars['Date']>;
  readonly streetaddress: InputMaybe<Scalars['String']>;
  readonly updatedAt: InputMaybe<Scalars['Date']>;
};

export type Driver = {
  readonly address: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly awaitingSignup: Scalars['Boolean'];
  readonly clientid: Scalars['String'];
  readonly createdAt: Scalars['Date'];
  readonly driver_id: Scalars['String'];
  readonly drivers_licence: Scalars['String'];
  readonly email: Scalars['String'];
  readonly filepath: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly firstname: Scalars['String'];
  readonly id: Scalars['String'];
  readonly lastname: Scalars['String'];
  readonly licence_state: Scalars['String'];
  readonly password: Scalars['String'];
  readonly phone: Scalars['String'];
  readonly reg_date: Scalars['Date'];
  readonly truckno: Scalars['String'];
  readonly updatedAt: Scalars['Date'];
};

export type DriverInput = {
  readonly address: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly awaitingSignup: InputMaybe<Scalars['Boolean']>;
  readonly clientid: InputMaybe<Scalars['String']>;
  readonly createdAt: InputMaybe<Scalars['Date']>;
  readonly driver_id: InputMaybe<Scalars['String']>;
  readonly drivers_licence: InputMaybe<Scalars['String']>;
  readonly email: InputMaybe<Scalars['String']>;
  readonly filepath: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly firstname: InputMaybe<Scalars['String']>;
  readonly id: InputMaybe<Scalars['String']>;
  readonly lastname: InputMaybe<Scalars['String']>;
  readonly licence_state: InputMaybe<Scalars['String']>;
  readonly password: InputMaybe<Scalars['String']>;
  readonly phone: InputMaybe<Scalars['String']>;
  readonly reg_date: InputMaybe<Scalars['Date']>;
  readonly truckno: InputMaybe<Scalars['String']>;
  readonly updatedAt: InputMaybe<Scalars['Date']>;
};

export type Load = {
  readonly assignedTo: Maybe<Scalars['String']>;
  readonly brokerId: Scalars['String'];
  readonly clientid: Scalars['String'];
  readonly commodity: Maybe<Scalars['String']>;
  readonly createdAt: Scalars['Date'];
  readonly filepath: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly hazmat: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly loadId: Maybe<Scalars['Int']>;
  readonly poNumber: Scalars['String'];
  readonly receiver: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly shipper: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly specialInstructions: Maybe<Scalars['String']>;
  readonly state: Scalars['String'];
  readonly totalWeight: Maybe<Scalars['String']>;
  readonly trailerNo: Maybe<Scalars['String']>;
  readonly tripId: Maybe<Scalars['String']>;
  readonly updatedAt: Scalars['Date'];
};

export type LoadInput = {
  readonly assignedTo: InputMaybe<Scalars['String']>;
  readonly brokerId: InputMaybe<Scalars['String']>;
  readonly clientid: InputMaybe<Scalars['String']>;
  readonly commodity: InputMaybe<Scalars['String']>;
  readonly createdAt: InputMaybe<Scalars['Date']>;
  readonly filepath: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly hazmat: InputMaybe<Scalars['Boolean']>;
  readonly id: InputMaybe<Scalars['String']>;
  readonly loadId: InputMaybe<Scalars['Int']>;
  readonly poNumber: InputMaybe<Scalars['String']>;
  readonly receiver: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly shipper: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly specialInstructions: InputMaybe<Scalars['String']>;
  readonly state: InputMaybe<Scalars['String']>;
  readonly totalWeight: InputMaybe<Scalars['String']>;
  readonly trailerNo: InputMaybe<Scalars['String']>;
  readonly tripId: InputMaybe<Scalars['String']>;
  readonly updatedAt: InputMaybe<Scalars['Date']>;
};

/** Load modified input information */
export type LoadModifiedInput = {
  /** Load assigned to (driverId: uuid) */
  readonly assignedTo: InputMaybe<Scalars['ID']>;
  /** Load brokerId (brokerId: uuid) */
  readonly brokerId: InputMaybe<Scalars['String']>;
  /** Commodity of the load (commodity: string) */
  readonly commodity: InputMaybe<Scalars['String']>;
  /** Is load is hazmat yes or no? (hazmat: boolean) */
  readonly hazmat: Scalars['Boolean'];
  /** The uuid of load, automatically generated if not provided */
  readonly id: InputMaybe<Scalars['ID']>;
  /** Po number (poNumber: string) */
  readonly poNumber: Scalars['String'];
  /** List of receivers (receiver: [string]) */
  readonly receiver: ReadonlyArray<InputMaybe<ReceiverInput>>;
  /** List of shippers (shipper: [string]) */
  readonly shipper: ReadonlyArray<InputMaybe<ShipperInput>>;
  /** Special instructions (specialInstructions: string) */
  readonly specialInstructions: InputMaybe<Scalars['String']>;
  /** State (state: string), CREATED | ASSIGNED | MOVING | DELIVERED | PAID */
  readonly state: Scalars['String'];
  /** Total weight (totalWeight: string) */
  readonly totalWeight: InputMaybe<Scalars['String']>;
  /** Assigned Trailer number (trailerNo: string) */
  readonly trailerNo: InputMaybe<Scalars['String']>;
};

export type Payroll = {
  readonly brokerId: Maybe<Scalars['String']>;
  readonly clientid: Scalars['String'];
  readonly commodity: Maybe<Scalars['String']>;
  readonly createdAt: Scalars['Date'];
  readonly filepath: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly hazmat: Scalars['Boolean'];
  readonly id: Scalars['String'];
  readonly loadId: Scalars['String'];
  readonly payrollTo: Scalars['String'];
  readonly perHourRate: Maybe<Scalars['Float']>;
  readonly perMileRate: Maybe<Scalars['Float']>;
  readonly poNumber: Scalars['String'];
  readonly receiver: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly shipper: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly totalHours: Maybe<Scalars['Float']>;
  readonly totalMiles: Maybe<Scalars['Float']>;
  readonly totalPay: Maybe<Scalars['Float']>;
  readonly totalWeight: Maybe<Scalars['String']>;
  readonly trailerNo: Maybe<Scalars['String']>;
  readonly updatedAt: Scalars['Date'];
};

export type PayrollInput = {
  readonly brokerId: InputMaybe<Scalars['String']>;
  readonly clientid: InputMaybe<Scalars['String']>;
  readonly commodity: InputMaybe<Scalars['String']>;
  readonly createdAt: InputMaybe<Scalars['Date']>;
  readonly filepath: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly hazmat: InputMaybe<Scalars['Boolean']>;
  readonly id: InputMaybe<Scalars['String']>;
  readonly loadId: InputMaybe<Scalars['String']>;
  readonly payrollTo: InputMaybe<Scalars['String']>;
  readonly perHourRate: InputMaybe<Scalars['Float']>;
  readonly perMileRate: InputMaybe<Scalars['Float']>;
  readonly poNumber: InputMaybe<Scalars['String']>;
  readonly receiver: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly shipper: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly totalHours: InputMaybe<Scalars['Float']>;
  readonly totalMiles: InputMaybe<Scalars['Float']>;
  readonly totalPay: InputMaybe<Scalars['Float']>;
  readonly totalWeight: InputMaybe<Scalars['String']>;
  readonly trailerNo: InputMaybe<Scalars['String']>;
  readonly updatedAt: InputMaybe<Scalars['Date']>;
};

/** Receiver information */
export type ReceiverInput = {
  /** Address of the receiver */
  readonly address: AddressInput;
  /** Arrival at the receiver */
  readonly arrival: InputMaybe<Scalars['String']>;
  /** Delivery appointment date and time */
  readonly deliveryAppointment: InputMaybe<Scalars['String']>;
  /** Depart at the receiver */
  readonly depart: InputMaybe<Scalars['String']>;
  /** Email of the receiver */
  readonly email: InputMaybe<Scalars['String']>;
  /** Phone number of the receiver */
  readonly phoneNumber: InputMaybe<Scalars['String']>;
  /** The name of the receiver */
  readonly receiverName: Scalars['String'];
  /** StopID(uuid) for the receiver */
  readonly stopID: Scalars['ID'];
};

/** Shipper information */
export type ShipperInput = {
  /** Address of the shipper */
  readonly address: AddressInput;
  /** Arrival at the shipper */
  readonly arrival: InputMaybe<Scalars['String']>;
  /** Depart at the shipper */
  readonly depart: InputMaybe<Scalars['String']>;
  /** Email of the shipper */
  readonly email: InputMaybe<Scalars['String']>;
  /** Phone number of the shipper */
  readonly phoneNumber: InputMaybe<Scalars['String']>;
  /** Pick up appointment date and time */
  readonly pickUpAppointment: InputMaybe<Scalars['String']>;
  /** The name of the shipper */
  readonly shipperName: Scalars['String'];
  /** StopID(uuid) for the shipper */
  readonly stopID: Scalars['ID'];
};

export type Trailer = {
  readonly clientid: Scalars['String'];
  readonly createdAt: Scalars['Date'];
  readonly filepath: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id: Scalars['String'];
  readonly licencePlate: Scalars['String'];
  readonly licenceState: Scalars['String'];
  readonly make: Scalars['String'];
  readonly model: Scalars['String'];
  readonly notes: Maybe<Scalars['String']>;
  readonly safetyExpire: Scalars['String'];
  readonly trailerAttributes: Scalars['String'];
  readonly trailerNo: Scalars['String'];
  readonly updatedAt: Scalars['Date'];
  readonly vinNumber: Maybe<Scalars['String']>;
  readonly year: Scalars['String'];
};

export type TrailerInput = {
  readonly clientid: InputMaybe<Scalars['String']>;
  readonly createdAt: InputMaybe<Scalars['Date']>;
  readonly filepath: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly id: InputMaybe<Scalars['String']>;
  readonly licencePlate: InputMaybe<Scalars['String']>;
  readonly licenceState: InputMaybe<Scalars['String']>;
  readonly make: InputMaybe<Scalars['String']>;
  readonly model: InputMaybe<Scalars['String']>;
  readonly notes: InputMaybe<Scalars['String']>;
  readonly safetyExpire: InputMaybe<Scalars['String']>;
  readonly trailerAttributes: InputMaybe<Scalars['String']>;
  readonly trailerNo: InputMaybe<Scalars['String']>;
  readonly updatedAt: InputMaybe<Scalars['Date']>;
  readonly vinNumber: InputMaybe<Scalars['String']>;
  readonly year: InputMaybe<Scalars['String']>;
};

export type Trip = {
  readonly assignedTo: Scalars['String'];
  readonly bol: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly clientid: Scalars['String'];
  readonly createdAt: Scalars['Date'];
  readonly id: Scalars['String'];
  readonly pod: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly state: Scalars['String'];
  readonly totalMiles: Maybe<Scalars['Float']>;
  readonly tripId: Scalars['Int'];
  readonly tripInfo: ReadonlyArray<Maybe<Scalars['String']>>;
  readonly updatedAt: Scalars['Date'];
};

export type TripInput = {
  readonly assignedTo: InputMaybe<Scalars['String']>;
  readonly bol: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly clientid: InputMaybe<Scalars['String']>;
  readonly createdAt: InputMaybe<Scalars['Date']>;
  readonly id: InputMaybe<Scalars['String']>;
  readonly pod: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly state: InputMaybe<Scalars['String']>;
  readonly totalMiles: InputMaybe<Scalars['Float']>;
  readonly tripId: InputMaybe<Scalars['Int']>;
  readonly tripInfo: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly updatedAt: InputMaybe<Scalars['Date']>;
};

export type Truck = {
  readonly clientid: Scalars['String'];
  readonly createdAt: Scalars['Date'];
  readonly filepath: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly id: Scalars['String'];
  readonly licencePlate: Scalars['String'];
  readonly licenceState: Scalars['String'];
  readonly make: Scalars['String'];
  readonly model: Scalars['String'];
  readonly notes: Maybe<Scalars['String']>;
  readonly safetyExpire: Scalars['String'];
  readonly truckNo: Scalars['String'];
  readonly updatedAt: Scalars['Date'];
  readonly vinNumber: Maybe<Scalars['String']>;
  readonly year: Scalars['String'];
};

export type TruckInput = {
  readonly clientid: InputMaybe<Scalars['String']>;
  readonly createdAt: InputMaybe<Scalars['Date']>;
  readonly filepath: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly id: InputMaybe<Scalars['String']>;
  readonly licencePlate: InputMaybe<Scalars['String']>;
  readonly licenceState: InputMaybe<Scalars['String']>;
  readonly make: InputMaybe<Scalars['String']>;
  readonly model: InputMaybe<Scalars['String']>;
  readonly notes: InputMaybe<Scalars['String']>;
  readonly safetyExpire: InputMaybe<Scalars['String']>;
  readonly truckNo: InputMaybe<Scalars['String']>;
  readonly updatedAt: InputMaybe<Scalars['Date']>;
  readonly vinNumber: InputMaybe<Scalars['String']>;
  readonly year: InputMaybe<Scalars['String']>;
};

export type UserAccount = {
  readonly active: Scalars['Boolean'];
  readonly address: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly awaitingSignup: Scalars['Boolean'];
  readonly clientid: Scalars['String'];
  readonly company: Scalars['String'];
  readonly createdAt: Scalars['Date'];
  readonly email: Scalars['String'];
  readonly filepath: Maybe<ReadonlyArray<Maybe<Scalars['String']>>>;
  readonly firstname: Scalars['String'];
  readonly id: Scalars['String'];
  readonly lastname: Scalars['String'];
  readonly password: Scalars['String'];
  readonly role: Maybe<Scalars['String']>;
  readonly token: Maybe<Scalars['String']>;
  readonly updatedAt: Scalars['Date'];
  readonly username: Scalars['String'];
};

export type UserAccountInput = {
  readonly active: InputMaybe<Scalars['Boolean']>;
  readonly address: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly awaitingSignup: InputMaybe<Scalars['Boolean']>;
  readonly clientid: InputMaybe<Scalars['String']>;
  readonly company: InputMaybe<Scalars['String']>;
  readonly createdAt: InputMaybe<Scalars['Date']>;
  readonly email: InputMaybe<Scalars['String']>;
  readonly filepath: InputMaybe<ReadonlyArray<InputMaybe<Scalars['String']>>>;
  readonly firstname: InputMaybe<Scalars['String']>;
  readonly id: InputMaybe<Scalars['String']>;
  readonly lastname: InputMaybe<Scalars['String']>;
  readonly password: InputMaybe<Scalars['String']>;
  readonly role: InputMaybe<Scalars['String']>;
  readonly token: InputMaybe<Scalars['String']>;
  readonly updatedAt: InputMaybe<Scalars['Date']>;
  readonly username: InputMaybe<Scalars['String']>;
};

export type TrailersQueryVariables = Exact<{
  where: InputMaybe<TrailerInput>;
  orderBy: InputMaybe<Scalars['String']>;
}>;

export type TrailersQuery = {
  readonly trailers: ReadonlyArray<{
    readonly id: string;
    readonly trailerNo: string;
  } | null> | null;
};

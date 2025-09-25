export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Success: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
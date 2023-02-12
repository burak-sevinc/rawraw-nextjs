export interface IPreviousTopic {
  name: string;
  time: number;
}

export interface ITopic {
  name: string;
  category: string;
}

export interface INotification {
  visible: boolean;
  status?: string | null;
  message?: string | null;
}

export interface IAvatar {
  bgColor: string;
  textColor: string;
}

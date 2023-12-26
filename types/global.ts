export type IconProps = {
  size?: string;
  color?: string;
};

export type JsdomProps = {
  document: ParentNode;
};

export type AlertProps = {
  message: string;
  error: boolean;
  visible: boolean;
};

export type PageProps = {
  params: {
    [key: string]: any;
  };
};

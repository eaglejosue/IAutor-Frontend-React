import { useEffect, useRef } from 'react';

const cloudName: string = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset: string = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const mainFolder: string = import.meta.env.VITE_CLOUDINARY_FOLDER;

export interface UploadWidgetProps {
  folder?: 'videos' | 'images';
  children: (params: { cloudinary: any; widget: any; open: () => void }) => JSX.Element;
  onUpload: (error: any, result: any, widget: any) => void;
}

const UploadCloudinary = ({
  folder = 'images',
  children,
  onUpload
}: UploadWidgetProps) => {
  const cloudinaryRef: any = useRef();
  const widgetRef: any = useRef();

  useEffect(() => {
    if (!cloudinaryRef.current && typeof window !== 'undefined') {
      cloudinaryRef.current = (window as any).cloudinary;
    }

    function onIdle() {
      if (!widgetRef.current) {
        widgetRef.current = createWidget();
      }
    }

    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);

    return () => {
      widgetRef.current?.destroy();
      widgetRef.current = undefined;
    };
  }, []);

  function createWidget() {

    if (!cloudName || !uploadPreset) {
      console.warn('Kindly ensure you have the cloudName and uploadPreset setup in your .env file at the root of your project.');
      return;  // Se as variáveis de ambiente não estiverem definidas, retorna para evitar criar o widget
    }

    const options = {
      cloudName,
      uploadPreset,
      folder: `${mainFolder}/${folder}`,
      clientAllowedFormats: folder === 'videos' ? ['video'] : ['image']
    };

    return cloudinaryRef.current?.createUploadWidget(options, (error: any, result: any) => {
      if ((error || result.event === 'success') && typeof onUpload === 'function')
        onUpload(error, result, widgetRef);
    });
  }

  function open() {
    if (!widgetRef.current)
      widgetRef.current = createWidget();
    if (widgetRef.current)
      widgetRef.current.open();
  }

  return <>{children({ cloudinary: cloudinaryRef.current, widget: widgetRef.current, open })}</>;
};

export default UploadCloudinary;

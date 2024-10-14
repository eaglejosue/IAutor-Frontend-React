import { useEffect, useState } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { scale, pad } from '@cloudinary/url-gen/actions/resize';
import { ifCondition } from '@cloudinary/url-gen/actions/conditional';
import { color } from '@cloudinary/url-gen/qualifiers/background';
import { Transformation } from '@cloudinary/url-gen';

export interface VideoPlayerProps {
  publicId: string;
  props?: any;
}

const VideoPlayerCloudinary = ({ publicId, ...props }: VideoPlayerProps) => {
  const [src, setSrc] = useState('');

  useEffect(() => {
    const cld = new Cloudinary({ cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME } });
    const video = cld.video(publicId);

    const transformation = new Transformation()
      .resize(scale().width(500))
      .conditional(
        ifCondition('aspect_ratio < 1.0', new Transformation().resize(pad().width(500).height(300).background(color('#000000'))))
      );

    video.addTransformation(transformation);

    setSrc(video.toURL());
  }, [publicId]);

  return (
    <video src={src} className="cld-video-player cld-fluid" controls controlsList="nodownload" {...props}/>
  )
};

export default VideoPlayerCloudinary;
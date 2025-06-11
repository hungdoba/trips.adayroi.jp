type VideoProps = {
  src: string;
  width?: number | string;
  height?: number | string;
  controls?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
};

export default function Video({
  src,
  width = '100%',
  height = 'auto',
  controls = true,
  autoPlay = false,
  loop = false,
  muted = false,
}: VideoProps) {
  return (
    <video
      src={src.startsWith('/') ? src : `/${src}`}
      width={width}
      height={height}
      controls={controls}
      autoPlay={autoPlay}
      loop={loop}
      muted={muted}
      style={{ display: 'block', maxWidth: '100%' }}
    >
      Your browser does not support the video tag.
    </video>
  );
}

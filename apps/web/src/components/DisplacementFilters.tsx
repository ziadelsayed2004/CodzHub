import base64_0 from './base64_0.txt?raw';
import base64_1 from './base64_1.txt?raw';

export default function DisplacementFilters() {
  const map0 = base64_0.trim();
  const map1 = base64_1.trim();

  return (
    <div className="switcher__filter">
      <style dangerouslySetInnerHTML={{ __html: `
        .switcher::before { filter: url(#switcher); }
      ` }} />
      <svg>
        <defs>
          <image id="map0-img" width="100%" height="100%" href={map0} xlinkHref={map0} />
          <image id="map1-img" width="100%" height="100%" href={map1} xlinkHref={map1} />
        </defs>

        <filter id="switcher" primitiveUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
          <feImage result="map" href="#map0-img" xlinkHref="#map0-img" />
          <feDisplacementMap 
            id="disp" 
            in="SourceGraphic" 
            in2="map" 
            scale="0.04" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
        
        <filter id="toggler" primitiveUnits="objectBoundingBox" colorInterpolationFilters="sRGB">
          <feImage result="map" href="#map1-img" xlinkHref="#map1-img" />
          <feDisplacementMap 
            id="disp" 
            in="SourceGraphic" 
            in2="map" 
            scale="0.02" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>
    </div>
  );
}

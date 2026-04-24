import * as React from 'react';
import Svg, { Path, Circle, Rect, G } from 'react-native-svg';

export const SvgFemale = (props: any) => (
  <Svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Circle cx="12" cy="10" r="4" />
    <Path d="M12 14v7" />
    <Path d="M9 18h6" />
  </Svg>
);

export const SvgMale = (props: any) => (
  <Svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Circle cx="10" cy="14" r="4" />
    <Path d="M12.83 11.17l5.66-5.66" />
    <Path d="M14.5 5h4v4" />
  </Svg>
);

export const SvgPeople = (props: any) => (
  <Svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <Circle cx="9" cy="7" r="4" />
    <Path d="M23 21v-2a4 4 0 00-3-3.87" />
    <Path d="M16 3.13a4 4 0 010 7.75" />
  </Svg>
);

export const SvgTimer = (props: any) => (
  <Svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Circle cx="12" cy="13" r="8" />
    <Path d="M12 9v4l2 2" />
    <Path d="M5 3L2 6" />
    <Path d="M19 3l3 3" />
  </Svg>
);

export const SvgCalendar = (props: any) => (
  <Svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <Path d="M16 2v4" />
    <Path d="M8 2v4" />
    <Path d="M3 10h18" />
    <Path d="M15 14h.01" />
  </Svg>
);

export const SvgClock = (props: any) => (
  <Svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Circle cx="12" cy="12" r="10" />
    <Path d="M12 6v6l4 2" />
  </Svg>
);

export const SvgHistory = (props: any) => (
  <Svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M3 12a9 9 0 109-9 9.75 9.75 0 00-6.74 2.74L3 8" />
    <Path d="M3 3v5h5" />
    <Path d="M12 7v5l4 2" />
  </Svg>
);

export const SvgOily = (props: any) => (
  <Svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
    <Path d="M12 18h.01" />
    <Path d="M16 11h.01" />
  </Svg>
);

export const SvgDry = (props: any) => (
  <Svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M9.59 4.59A2 2 0 1111 8H2m10.59 11.41A2 2 0 1014 16H2m15.73-8.27A2.5 2.5 0 1119.5 12H2" />
  </Svg>
);

export const SvgNormal = (props: any) => (
  <Svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M9.937 15.5A2 2 0 008.5 14.063l-6.135-1.582a.5.5 0 010-.962L8.5 9.936A2 2 0 009.937 8.5l1.582-6.135a.5.5 0 01.963 0L14.063 8.5A2 2 0 0015.5 9.937l6.135 1.581a.5.5 0 010 .964L15.5 14.063a2 2 0 00-1.437 1.437l-1.582 6.135a.5.5 0 01-.963 0z" />
  </Svg>
);

export const SvgCombo = (props: any) => (
  <Svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M12 21a9 9 0 009-9H3a9 9 0 009 9z" />
    <Path d="M12 12A9 9 0 0012 3v9z" />
  </Svg>
);

export const SvgCheckCircle = (props: any) => (
  <Svg width={props.size || 24} height={props.size || 24} viewBox="0 0 24 24" fill="none" stroke={props.color || "currentColor"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <Path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
    <Path d="M22 4L12 14.01l-3-3" stroke={props.color || "currentColor"} />
  </Svg>
);

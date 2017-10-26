import React from 'react';
import Breakpoint from 'utils/ResponsiveBreakpoints.js';

export function DesktopBreakpoint(props) {
 return (
   <Breakpoint name="desktop">
    {props.children}
   </Breakpoint>
 );
}

export function TabletBreakpoint(props) {
 return (
   <Breakpoint name="tablet">
    {props.children}
   </Breakpoint>
 );
}

export function DesktopTabletBreakpoint(props) {
 return (
   <Breakpoint name="desktopTablet">
    {props.children}
   </Breakpoint>
 );
}

export function PhoneBreakpoint(props) {
 return (
   <Breakpoint name="phone">
    {props.children}
   </Breakpoint>
 );
}

import React from 'react'
import './Triangle.less'
export default (size,data) => {
  let ps = "M0 0 Z";
  let dps = "M0 0 Z";
  let cx1,cy1,cx2,cy2,cx3,cy3,cx,cy;
  let w,h;
  let pad = 80;
  let dis;
  if(size){
    let cos30 = Math.cos(Math.PI/6);
    let sin30 = Math.sin(Math.PI/6);
    w = size - pad;//triangle width
    h = cos30 * w;
    cx1 = w/2 + pad/2;cy1 = pad/2;cx2 = w + pad/2;cy2 = h + pad/2;cx3 = pad/2;cy3 = h + pad/2;
    ps = `M${cx1} ${cy1} L${cx2} ${cy2} L${cx3} ${cy3} Z`;
    dis = (w / 2)/cos30;
    cx = w/2+pad/2;cy = dis+pad/2;//中心点
    let x1,y1,x2,y2,x3,y3;
    let [d1,d2,d3] = data;
    let dis1 = d1 * dis,dis2 = d2 * dis,dis3 = d3 * dis;
    let dis2x = cos30 * dis2,dis2y = sin30 * dis2;
    let dis3x =  cos30 * dis3,dis3y = sin30 * dis3;
    x1 = cx;y1 = cy - dis1;x2 = cx + dis2x;y2 = cy + dis2y;x3 = cx - dis3x;y3 = cy + dis3y;
    dps = `M${x1} ${y1} L${x2} ${y2} L${x3} ${y3} Z`;

  }
  return <svg  x={0} y={0} width={size || 180} height={size || 180}>
    <defs>
    <filter id='alph' width={w} height={h}>
      <feConvolveMatrix result='fis' type="matrix" kernelMatrix="1 0 0 0 0
                          0 1 0 0 0 0 0 1 0 0
                          0 0 0 0.3 0"/>
      </filter>
      <filter id="bf1" x="-11" y="-11" width={w} height={h}>
        <feOffset in="fis" result='offOut' dx="0" dy="2" />
        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
        <feBlend in="SourceGraphic" in2="blurOut" result='bfs' mode="normal" />
        <feBlend in="alph" in2="bfs" mode="normal" />
      </filter>
      <filter id="df1" x="-20" y="-20" width={w} height={h}>
        <feOffset in="SourceAlpha" result='offOut' dx="0" dy="2" />
        <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
        <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
      </filter>
      <linearGradient id='fps' x1='100%' y1='0%' x2='100%' y2='100%'>
        <stop offset="0%" stopColor='#e9723c' stopOpacity='1'/>
        <stop offset="100%" stopColor='#f66c2e' stopOpacity='0'/>
      </linearGradient>
      <linearGradient id='qua' x1='0%' y1='0%' x2='100%' y2='100%'>
        <stop offset="0%" stopColor='#b45e96' stopOpacity='0'/>
        <stop offset="100%" stopColor='#b45d95' stopOpacity='1'/>
      </linearGradient>
      <linearGradient id='rtt' x1='0%' y1='100%' x2='100%' y2='100%'>
        <stop offset="0%" stopColor='#bbe289' stopOpacity='1'/>
        <stop offset="100%" stopColor='#bce289' stopOpacity='0'/>
      </linearGradient>
    </defs>

    <path className='back-triangle' name='back-triangle' d={ps} filter='url(#bf1)'></path>
    <g className='fps'>
      <title>fps {data[0]}</title>
      <rect x={cx1} y={cy1} width={0.5} height={dis} fill='url(#fps)'/>
      <text textAnchor="middle" x={w/2 + pad/2} y={pad/2 - 15}>Fps</text>
    </g>
    <g className='quality'>
      <title>quality {data[1]}</title>
      <line x1={cx} y1={cy} x2={cx2} y2={cy2} stroke='url(#qua)'></line>
      <text  x={w+pad/2} y={h+pad/2}>Quality</text>
    </g>
    <g className='rtt'>
      <title>rtt {data[2]}</title>
      <line x1={cx} y1={cy} x2={cx3} y2={cy3} stroke='url(#rtt)'></line>
      <text x={0} y={h+pad/2} >Rtt</text>
    </g>
    <path className='data-triangle' name='data-triangle' fill='rgba(39,63,94,0.6)' stroke="lightgreen" d={dps}  filter='url(#df1)'></path>
  </svg>

}
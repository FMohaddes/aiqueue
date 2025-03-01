import { Theme, css } from 'antd-style';

// fix ios input keyboard
// overflow: hidden;
// ref: https://zhuanlan.zhihu.com/p/113855026
export default ({ token }: { prefixCls: string; token: Theme }) => css`
     @font-face {
          font-family  : "Shabnam";
          src          : url("/fonts/shabnam/Shabnam.woff2") format("woff2"),
          url("/fonts/shabnam/Shabnam.woff") format("woff");
          font-weight  : normal;
          font-style   : normal;
          font-display : swap;
          }
     
     @font-face {
          font-family  : "Shabnam";
          src          : url("/fonts/shabnam/Shabnam-Medium.woff2") format("woff2"),
          url("/fonts/shabnam/Shabnam-Medium.woff") format("woff");
          font-weight  : 500;
          font-style   : normal;
          font-display : swap;
          }
     
     @font-face {
          font-family  : "Shabnam";
          src          : url("/fonts/shabnam/Shabnam-Bold.woff2") format("woff2"),
          url("/fonts/shabnam/Shabnam-Bold.woff") format("woff");
          font-weight  : bold;
          font-style: normal;
          font-display : swap;
          } 
     @font-face {
          font-family  : "Shabnam";
          src          : url("/fonts/shabnam/Shabnam-Light.woff2") format("woff2"),
          url("/fonts/shabnam/Shabnam-Light.woff") format("woff");
          font-weight: 400;
          font-style   : normal;
          font-display : swap;
          }
     @font-face {
          font-family  : "Shabnam";
          src          : url("/fonts/shabnam/Shabnam-Thin.woff2") format("woff2"),
          url("/fonts/shabnam/Shabnam-Thin.woff") format("woff");
          font-weight: 300;
          font-style   : normal;
          font-display : swap;
          }
     
     html,
     body,
     #__next {
          scroll-padding-top : 72px;
          }
     
     * {
          font-family     : "Shabnam", Tahoma, Arial, sans-serif !important;
          scrollbar-color : ${token.colorFill} transparent;
          scrollbar-width : thin;
          
          ::-webkit-scrollbar {
               width  : 0.75em;
               height : 0.75em;
               }
          
          ::-webkit-scrollbar-thumb {
               border-radius : 10px;
               }
          
          :hover::-webkit-scrollbar-thumb {
               border           : 3px solid transparent;
               background-color : ${token.colorText};
               background-clip  : content-box;
               }
          
          ::-webkit-scrollbar-track {
               background-color : transparent;
               }
               
          }

`;

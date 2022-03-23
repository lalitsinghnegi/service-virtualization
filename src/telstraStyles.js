import { createGlobalStyle } from 'styled-components';
import akkuratRegularEotFont from './assets/fonts/TelstraAkkuratWeb-Regular.eot'
import akkuratRegularSvgFont from './assets/fonts/TelstraAkkuratWeb-Regular.svg'
import akkuratRegularTtfFont from './assets/fonts/TelstraAkkuratWeb-Regular.ttf'
import akkuratRegularWoffFont from './assets/fonts/TelstraAkkuratWeb-Regular.woff'
import gravurLightEotFont from './assets/fonts/TelstraGravurWeb-Light.eot'
import gravurLightSvgFont from './assets/fonts/TelstraGravurWeb-Light.svg'
import gravurLightTtfFont from './assets/fonts/TelstraGravurWeb-Light.ttf'
import gravurLightWoffFont from './assets/fonts/TelstraGravurWeb-Light.woff'
import mainFont from './assets/fonts/td-original-icons.eot';
import spectrum from './assets/images/spectrum-blue-fixed.png';
import spectrumBg from './assets/images/spectrum-bg.png';
import svgFont from './assets/fonts/td-original-icons.svg';
import ttfFont from './assets/fonts/td-original-icons.ttf';
import woffFont from './assets/fonts/td-original-icons.woff';

/* eslint no-unused-expressions: 0 */
export default createGlobalStyle`
@font-face{
    font-family:'td-icons';
    src:url(${mainFont});
    src:url('https://www.telstra.com.au/etc/designs/tcom/tcom-core/fonts/td-original-icons.eot#iefix') format('embedded-opentype'),url(${woffFont}) format('woff'),url(${ttfFont}) format('truetype'),url(${svgFont}) format('svg');
    font-weight:normal;
    font-style:normal
}
@font-face {
    font-family: "TelstraAkkuratWeb-Regular";
    src: url(${akkuratRegularEotFont});
    src: url(${akkuratRegularWoffFont}) format("woff"),
         url(${akkuratRegularTtfFont}) format("truetype"),
         url(${akkuratRegularSvgFont}) format("svg");
    font-weight: normal;
    font-style: normal;
}
@font-face {
    font-family: "TelstraGravurWeb-Light";
    src: url(${gravurLightEotFont});
    src: url(${gravurLightWoffFont}) format("woff"),
         url(${gravurLightTtfFont}) format("truetype"),
         url(${gravurLightSvgFont}) format("svg");
    font-weight: normal;
    font-style: normal;
}
.td-icon-hover:hover{
    text-decoration:none;
    color:#fff !important
}
.base-orange .td-icon-hover:hover{
    background-color:#ec5600
}
.base-purple .td-icon-hover:hover{
    background-color:#7c69b8
}
.base-turquoise .td-icon-hover:hover{
    background-color:#29a4a2
}
.base-green .td-icon-hover:hover{
    background-color:#00cc33
}
.base-magenta .td-icon-hover:hover{
    background-color:#e8398d
}
.base-blue .td-icon-hover:hover{
    background-color:#00b4ff
}
.base-default .td-icon-hover:hover{
    background-color:#00b4ff
}
.td-icon-hover:hover .icon-lock{
    color:#fff !important;
    border:1px solid #fff
}
.base-orange .td-icon-hover:hover .icon-lock{
    background-color:#fce6da
}
.base-purple .td-icon-hover:hover .icon-lock{
    background-color:#eceef6
}
.base-turquoise .td-icon-hover:hover .icon-lock{
    background-color:#dfeff0
}
.base-green .td-icon-hover:hover .icon-lock{
    background-color:#deeddf
}
.base-magenta .td-icon-hover:hover .icon-lock{
    background-color:#fae1ee
}
.base-blue .td-icon-hover:hover .icon-lock{
    background-color:#e1eef8
}
.base-default .td-icon-hover:hover .icon-lock{
    background-color:#e1eef8
}
.td-icon,.td-icon-xs,.td-icon-sm,.td-icon-md,.td-icon-lg,.td-icon-xl{
    position:relative;
    font-family:'td-icons';
    speak:none;
    font-style:normal;
    font-weight:normal;
    font-variant:normal;
    text-transform:none;
    line-height:1;
    vertical-align:middle;
    -webkit-font-smoothing:antialiased;
    -moz-osx-font-smoothing:grayscale
}
.td-icon .icon-lock,.td-icon-xs .icon-lock,.td-icon-sm .icon-lock,.td-icon-md .icon-lock,.td-icon-lg .icon-lock,.td-icon-xl .icon-lock{
    position:absolute;
    top:-10px;
    right:-10px;
    padding:4px !important;
    border-radius:20px;
    border:1px solid transparent
}
.td-icon p,.td-icon-xs p,.td-icon-sm p,.td-icon-md p,.td-icon-lg p,.td-icon-xl p{
    margin:0;
    font-size:14px;
    font-size:1.4rem;
    font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;
    color:#000;
    line-height:18px
}
.base-orange a.td-icon p,.base-orange a.td-icon-xs p,.base-orange a.td-icon-sm p,.base-orange a.td-icon-md p,.base-orange a.td-icon-lg p,.base-orange a.td-icon-xl p{
    color:#bb2914
}
.base-purple a.td-icon p,.base-purple a.td-icon-xs p,.base-purple a.td-icon-sm p,.base-purple a.td-icon-md p,.base-purple a.td-icon-lg p,.base-purple a.td-icon-xl p{
    color:#4c479f
}
.base-turquoise a.td-icon p,.base-turquoise a.td-icon-xs p,.base-turquoise a.td-icon-sm p,.base-turquoise a.td-icon-md p,.base-turquoise a.td-icon-lg p,.base-turquoise a.td-icon-xl p{
    color:#227e7d
}
.base-green a.td-icon p,.base-green a.td-icon-xs p,.base-green a.td-icon-sm p,.base-green a.td-icon-md p,.base-green a.td-icon-lg p,.base-green a.td-icon-xl p{
    color:#1d5f27
}
.base-magenta a.td-icon p,.base-magenta a.td-icon-xs p,.base-magenta a.td-icon-sm p,.base-magenta a.td-icon-md p,.base-magenta a.td-icon-lg p,.base-magenta a.td-icon-xl p{
    color:#841f8d
}
.base-blue a.td-icon p,.base-blue a.td-icon-xs p,.base-blue a.td-icon-sm p,.base-blue a.td-icon-md p,.base-blue a.td-icon-lg p,.base-blue a.td-icon-xl p{
    color:#1964c8
}
.base-default a.td-icon p,.base-default a.td-icon-xs p,.base-default a.td-icon-sm p,.base-default a.td-icon-md p,.base-default a.td-icon-lg p,.base-default a.td-icon-xl p{
    color:#1964c8
}
.td-icon-xs{
    font-size:16px;
    font-size:1.6rem
}
.td-icon-sm{
    font-size:42px;
    font-size:3rem
}
.td-icon-md{
    font-size:70px;
    font-size:7rem
}
.td-icon-lg{
    font-size:118px;
    font-size:11.8rem
}
.td-icon-xl{
    font-size:168px;
    font-size:16.8rem
}
.icon-api:before{
    content:"\\e973"
}
.icon-byod:before{
    content:"\\e974"
}
.icon-byod-old:before{
    content:"\\e975"
}
.icon-corporate-mobile-plus:before{
    content:"\\e976"
}
.icon-corporate-mobile-plus-old:before{
    content:"\\e977"
}
.icon-cost-control:before{
    content:"\\e978"
}
.icon-cost-reduction:before{
    content:"\\e979"
}
.icon-data-add-on:before{
    content:"\\e97a"
}
.icon-data-add-on-old:before{
    content:"\\e97b"
}
.icon-data-insights:before{
    content:"\\e97c"
}
.icon-data-insights-old:before{
    content:"\\e97d"
}
.icon-data-plan:before{
    content:"\\e97e"
}
.icon-data-plan-old:before{
    content:"\\e97f"
}
.icon-enterprise:before{
    content:"\\e980"
}
.icon-enterprise-international-roaming:before{
    content:"\\e981"
}
.icon-enterprise-mbb:before{
    content:"\\e982"
}
.icon-enterprise-mbb-old:before{
    content:"\\e983"
}
.icon-enterprise-mobile-plan:before{
    content:"\\e984"
}
.icon-expert-finder:before{
    content:"\\e985"
}
.icon-fleet:before{
    content:"\\e986"
}
.icon-gps-fleet-tracking-pos:before{
    content:"\\e987"
}
.icon-gps-fleet-tracking-pos-old:before{
    content:"\\e988"
}
.icon-gps-truck-tracking-pos:before{
    content:"\\e989"
}
.icon-headset:before{
    content:"\\e98a"
}
.icon-hosted-server-pos:before{
    content:"\\e98b"
}
.icon-hosted-server-pos-old:before{
    content:"\\e98c"
}
.icon-key-features:before{
    content:"\\e98d"
}
.icon-messaging-api:before{
    content:"\\e98e"
}
.icon-mobile-data-security:before{
    content:"\\e98f"
}
.icon-mobile-data-security-old:before{
    content:"\\e990"
}
.icon-mobile-device-leasing:before{
    content:"\\e991"
}
.icon-mobile-device-mgmt:before{
    content:"\\e992"
}
.icon-mobile-fleet:before{
    content:"\\e993"
}
.icon-mobile-identity-solutions:before{
    content:"\\e994"
}
.icon-mobile-identity-solutions-old:before{
    content:"\\e995"
}
.icon-mobile-managed-service:before{
    content:"\\e996"
}
.icon-mobile-messaging:before{
    content:"\\e997"
}
.icon-mobile-roaming-day-pass:before{
    content:"\\e998"
}
.icon-mobile-roaming-day-pass-old:before{
    content:"\\e999"
}
.icon-mobile-workspace:before{
    content:"\\e99a"
}
.icon-mobile-workspace-old:before{
    content:"\\e99b"
}
.icon-mobility-fleet-care-plus:before{
    content:"\\e99c"
}
.icon-optional-inclusions:before{
    content:"\\e99d"
}
.icon-productivity-gains:before{
    content:"\\e99e"
}
.icon-quote:before{
    content:"\\e99f"
}
.icon-retail:before{
    content:"\\e9a0"
}
.icon-retail-old:before{
    content:"\\e9a1"
}
.icon-risk-management:before{
    content:"\\e9a2"
}
.icon-road-map:before{
    content:"\\e9a3"
}
.icon-service-management:before{
    content:"\\e9a4"
}
.icon-sim-swap:before{
    content:"\\e9a5"
}
.icon-tablet-device-leasing:before{
    content:"\\e9a6"
}
.icon-tablet-plan:before{
    content:"\\e9a7"
}
.icon-telstra-access-manager:before{
    content:"\\e9a8"
}
.icon-telstra-access-manager-old:before{
    content:"\\e9a9"
}
.icon-voice-plan:before{
    content:"\\e9aa"
}
.icon-whispir:before{
    content:"\\e9ab"
}
.icon-white-paper:before{
    content:"\\e9ac"
}
.icon-bsip:before{
    content:"\\e972"
}
.icon-current-contract-expiring:before{
    content:"\\e96e"
}
.icon-legacy-product-expiring:before{
    content:"\\e96f"
}
.icon-market-comparison-recommendation:before{
    content:"\\e970"
}
.icon-product-upgrade:before{
    content:"\\e971"
}
.icon-bookmark:before{
    content:"\\e95f"
}
.icon-business-ip:before{
    content:"\\e960"
}
.icon-connect-ip:before{
    content:"\\e961"
}
.icon-ethernet-man:before{
    content:"\\e962"
}
.icon-internet-direct:before{
    content:"\\e963"
}
.icon-man:before{
    content:"\\e964"
}
.icon-managed-solution:before{
    content:"\\e965"
}
.icon-notification:before{
    content:"\\e966"
}
.icon-optic-wave:before{
    content:"\\e967"
}
.icon-share:before{
    content:"\\e968"
}
.icon-unfollow:before{
    content:"\\e969"
}
.icon-upgrade:before{
    content:"\\e96a"
}
.icon-vd:before{
    content:"\\e96b"
}
.icon-vpn:before{
    content:"\\e96c"
}
.icon-wan:before{
    content:"\\e96d"
}
.icon-speech:before{
    content:"\\e95e"
}
.icon-alert-solid-round:before{
    content:"\\e95c"
}
.icon-alert-solid-triangle:before{
    content:"\\e95d"
}
.icon-troubleshooting:before{
    content:"\\e95b"
}
.icon-telstra-vantage:before{
    content:"\\e957"
}
.icon-information-solid:before{
    content:"\\e956"
}
.icon-crowd-support-filled:before{
    content:"\\e955"
}
.icon-marketing-choices:before{
    content:"\\e954"
}
.icon-law-enforcement:before{
    content:"\\e953"
}
.icon-advertising:before{
    content:"\\e94d"
}
.icon-aggregating-info:before{
    content:"\\e94e"
}
.icon-cookies:before{
    content:"\\e94f"
}
.icon-encryption:before{
    content:"\\e950"
}
.icon-keep-information:before{
    content:"\\e951"
}
.icon-lan-enforcement:before{
    content:"\\e952"
}
.icon-marketing:before{
    content:"\\e958"
}
.icon-online-safety:before{
    content:"\\e959"
}
.icon-research-analytics:before{
    content:"\\e95a"
}
.icon-help-support:before{
    content:"\\e723"
}
.icon-contactus:before{
    content:"\\e722"
}
.icon-gst:before{
    content:"\\e934"
}
.icon-promo:before{
    content:"\\e94c"
}
.icon-14-days-free-poc:before{
    content:"\\e918"
}
.icon-14-days-free-trial:before{
    content:"\\e919"
}
.icon-30-days-free-poc:before{
    content:"\\e91a"
}
.icon-30-days-free-trial:before{
    content:"\\e91b"
}
.icon-access-permissions:before{
    content:"\\e91c"
}
.icon-ato-compliant:before{
    content:"\\e91d"
}
.icon-barcode-scanning:before{
    content:"\\e91e"
}
.icon-blog:before{
    content:"\\e91f"
}
.icon-branding:before{
    content:"\\e920"
}
.icon-business-apps:before{
    content:"\\e921"
}
.icon-collect-mobile-payments:before{
    content:"\\e922"
}
.icon-concierge-service:before{
    content:"\\e923"
}
.icon-consultancy-design-service:before{
    content:"\\e924"
}
.icon-convert-paper-to-digital:before{
    content:"\\e925"
}
.icon-crm2:before{
    content:"\\e926"
}
.icon-customer-testimonials:before{
    content:"\\e927"
}
.icon-design:before{
    content:"\\e928"
}
.icon-desktop-mob-tab-access:before{
    content:"\\e929"
}
.icon-dispatch-workflow:before{
    content:"\\e92a"
}
.icon-document-tracking:before{
    content:"\\e92b"
}
.icon-drag-and-drop-form:before{
    content:"\\e92c"
}
.icon-electronic-signatures:before{
    content:"\\e92d"
}
.icon-email-support:before{
    content:"\\e92e"
}
.icon-file-sharing:before{
    content:"\\e92f"
}
.icon-free-demo:before{
    content:"\\e930"
}
.icon-gps-mobile-tracking:before{
    content:"\\e931"
}
.icon-gps-tablet-tracking:before{
    content:"\\e932"
}
.icon-gps-vehicle-tracking:before{
    content:"\\e933"
}
.icon-human-verified:before{
    content:"\\e935"
}
.icon-inbuilt-integration:before{
    content:"\\e936"
}
.icon-magic-envelopes:before{
    content:"\\e937"
}
.icon-maps-directions:before{
    content:"\\e938"
}
.icon-non-profit:before{
    content:"\\e939"
}
.icon-offline-access:before{
    content:"\\e93a"
}
.icon-paying-invoice:before{
    content:"\\e93b"
}
.icon-payroll:before{
    content:"\\e93c"
}
.icon-profitable:before{
    content:"\\e93d"
}
.icon-receipt-management:before{
    content:"\\e93e"
}
.icon-recognition:before{
    content:"\\e93f"
}
.icon-sale:before{
    content:"\\e940"
}
.icon-science:before{
    content:"\\e941"
}
.icon-secure-storage:before{
    content:"\\e942"
}
.icon-single-sign-on:before{
    content:"\\e943"
}
.icon-staff-rostering:before{
    content:"\\e944"
}
.icon-technologies2:before{
    content:"\\e945"
}
.icon-telstra-apps-marketplace:before{
    content:"\\e946"
}
.icon-time-entries-approval:before{
    content:"\\e947"
}
.icon-timesheets:before{
    content:"\\e948"
}
.icon-tracking-time:before{
    content:"\\e949"
}
.icon-unlimited-users:before{
    content:"\\e94a"
}
.icon-webinar:before{
    content:"\\e94b"
}
.icon-number-eight-invert:before{
    content:"\\e90e"
}
.icon-number-five-invert:before{
    content:"\\e90f"
}
.icon-number-four-invert:before{
    content:"\\e910"
}
.icon-number-nine-invert:before{
    content:"\\e911"
}
.icon-number-one-invert:before{
    content:"\\e912"
}
.icon-number-seven-invert:before{
    content:"\\e913"
}
.icon-number-six-invert:before{
    content:"\\e914"
}
.icon-number-ten-invert:before{
    content:"\\e915"
}
.icon-number-three-invert:before{
    content:"\\e916"
}
.icon-number-two-invert:before{
    content:"\\e917"
}
.icon-iot:before{
    content:"\\e90d"
}
.icon-smart-home:before{
    content:"\\e90c"
}
.icon-calling-pack:before{
    content:"\\e90a"
}
.icon-foxtel:before{
    content:"\\e90b"
}
.icon-linkedin:before{
    content:"\\e909"
}
.icon-google-plus:before{
    content:"\\e908"
}
.icon-round-tick:before{
    content:"\\e906"
}
.icon-round-cross:before{
    content:"\\e907"
}
.icon-arts:before{
    content:"\\e905"
}
.icon-id:before{
    content:"\\e904"
}
.icon-hashtag:before{
    content:"\\e903"
}
.icon-message:before{
    content:"\\e902"
}
.icon-speed-guide:before{
    content:"\\e900"
}
.icon-location:before{
    content:"\\e901"
}
.icon-telstra-tv:before{
    content:"\\e721"
}
.icon-telstra-air:before{
    content:"\\e71f"
}
.icon-wayfinding:before{
    content:"\\e720"
}
.icon-ui-largearrow-down:before{
    content:"\\e71e"
}
.icon-ui-video-play:before{
    content:"\\e71d"
}
.icon-credit-meu:before{
    content:"\\e719"
}
.icon-mobile-plan:before{
    content:"\\e71a"
}
.icon-outside-link-arrow:before{
    content:"\\e71b"
}
.icon-security-shield:before{
    content:"\\e71c"
}
.icon-leave-it-with-us:before{
    content:"\\e70f"
}
.icon-works-on-nbn:before{
    content:"\\e716"
}
.icon-alert-round:before{
    content:"\\e714"
}
.icon-alert-triangle:before{
    content:"\\e715"
}
.thumbs-down:before{
    content:"\\e710"
}
.thumbs-up:before{
    content:"\\e711"
}
.icon-collaboration:before{
    content:"\\e706"
}
.icon-customer-contact-solution:before{
    content:"\\e707"
}
.icon-digital-media:before{
    content:"\\e708"
}
.icon-education:before{
    content:"\\e709"
}
.icon-financial-services:before{
    content:"\\e70a"
}
.icon-machine-to-machine:before{
    content:"\\e70b"
}
.icon-mining-resources:before{
    content:"\\e70c"
}
.icon-self-service-apps:before{
    content:"\\e70d"
}
.icon-transport-logistics:before{
    content:"\\e70e"
}
.icon-aged-care:before{
    content:"\\e700"
}
.icon-general-practitioner:before{
    content:"\\e701"
}
.icon-hospital:before{
    content:"\\e702"
}
.icon-pharmacy:before{
    content:"\\e703"
}
.icon-telstra-heroes:before{
    content:"\\e704"
}
.icon-computer-protection:before{
    content:"\\e6f9"
}
.icon-safe-browser:before{
    content:"\\e6fa"
}
.icon-new-phone-feeling:before{
    content:"\\e6fb"
}
.icon-new-phone-feeling-free:before{
    content:"\\e6fc"
}
.icon-parental-control:before{
    content:"\\e6fd"
}
.icon-4g-double-coverage:before{
    content:"\\e601"
}
.icon-4g-network-speed:before{
    content:"\\e602"
}
.icon-add-ons:before{
    content:"\\e603"
}
.icon-alerts-reminders:before{
    content:"\\e604"
}
.icon-anti-spam:before{
    content:"\\e605"
}
.icon-anti-virus:before{
    content:"\\e606"
}
.icon-application-ngdr:before{
    content:"\\e607"
}
.icon-application-site-minder:before{
    content:"\\e608"
}
.icon-application-uc:before{
    content:"\\e609"
}
.icon-application-vistabridge:before{
    content:"\\e60a"
}
.icon-application-vistacockpit:before{
    content:"\\e60b"
}
.icon-application-vistamart:before{
    content:"\\e60c"
}
.icon-apps-24x7:before{
    content:"\\e60d"
}
.icon-audio-web:before{
    content:"\\e60e"
}
.icon-backup:before{
    content:"\\e60f"
}
.icon-backup-safe:before{
    content:"\\e610"
}
.icon-bill-date:before{
    content:"\\e611"
}
.icon-bill-edit-details:before{
    content:"\\e612"
}
.icon-billing:before{
    content:"\\e613"
}
.icon-bill-manage:before{
    content:"\\e614"
}
.icon-bill-paper:before{
    content:"\\e615"
}
.icon-bill-paperless:before{
    content:"\\e616"
}
.icon-bill-payment:before{
    content:"\\e617"
}
.icon-bill-payment-extension:before{
    content:"\\e618"
}
.icon-bluetooth:before{
    content:"\\e619"
}
.icon-bundle:before{
    content:"\\e61a"
}
.icon-business-centers:before{
    content:"\\e61b"
}
.icon-business-resources:before{
    content:"\\e61c"
}
.icon-business-building:before{
    content:"\\e61d"
}
.icon-business-secure:before{
    content:"\\e61e"
}
.icon-business-small-building:before{
    content:"\\e61f"
}
.icon-calendar:before{
    content:"\\e620"
}
.icon-camera:before{
    content:"\\e621"
}
.icon-case-studies:before{
    content:"\\e622"
}
.icon-chat-forums:before{
    content:"\\e623"
}
.icon-check-usage:before{
    content:"\\e624"
}
.icon-cloud:before{
    content:"\\e625"
}
.icon-cloud-payg:before{
    content:"\\e626"
}
.icon-cloud-tipt-phone:before{
    content:"\\e627"
}
.icon-cloud-video-conferencing:before{
    content:"\\e628"
}
.icon-computer-cpu:before{
    content:"\\e629"
}
.icon-coverage-maps:before{
    content:"\\e62a"
}
.icon-crm:before{
    content:"\\e62b"
}
.icon-crowd-support:before{
    content:"\\e62c"
}
.icon-customer-relationship-management:before{
    content:"\\e62d"
}
.icon-data-calculator:before{
    content:"\\e62e"
}
.icon-desk:before{
    content:"\\e62f"
}
.icon-machine-to-machine2:before{
    content:"\\e712"
}
.icon-device-support:before{
    content:"\\e630"
}
.icon-direct-debit:before{
    content:"\\e631"
}
.icon-document-service-improve-reporting:before{
    content:"\\e632"
}
.icon-document-zip:before{
    content:"\\e633"
}
.icon-dot:before{
    content:"\\e634"
}
.icon-download:before{
    content:"\\e635"
}
.icon-international-roaming-data-pack:before{
    content:"\\e636"
}
.icon-data-plus-pack:before{
    content:"\\e637"
}
.icon-download-exe:before{
    content:"\\e638"
}
.icon-download-jpg:before{
    content:"\\e639"
}
.icon-download-pdf:before{
    content:"\\e63a"
}
.icon-download-png:before{
    content:"\\e63b"
}
.icon-email:before{
    content:"\\e63c"
}
.icon-email-security:before{
    content:"\\e63d"
}
.icon-find-telstra-store:before{
    content:"\\e63e"
}
.icon-firewall:before{
    content:"\\e63f"
}
.icon-flash-usb:before{
    content:"\\e640"
}
.icon-flybuys:before{
    content:"\\e641"
}
.icon-forgotten-password:before{
    content:"\\e642"
}
.icon-forgotten-username:before{
    content:"\\e643"
}
.icon-free-banner:before{
    content:"\\e645"
}
.icon-free-delivery:before{
    content:"\\e646"
}
.icon-games:before{
    content:"\\e647"
}
.icon-government:before{
    content:"\\e648"
}
.icon-greater-reliability:before{
    content:"\\e649"
}
.icon-health-care:before{
    content:"\\e64a"
}
.icon-help:before{
    content:"\\e64b"
}
.icon-home:before{
    content:"\\e64c"
}
.icon-hosted-cloud-services:before{
    content:"\\e64d"
}
.icon-industries:before{
    content:"\\e64e"
}
.icon-information:before{
    content:"\\e64f"
}
.icon-installation:before{
    content:"\\e650"
}
.icon-installation-platinum:before{
    content:"\\e651"
}
.icon-interactive-voice-response:before{
    content:"\\e652"
}
.icon-interface-me:before{
    content:"\\e653"
}
.icon-international-roaming:before{
    content:"\\e654"
}
.icon-domain-name:before{
    content:"\\e655"
}
.icon-online-portal:before{
    content:"\\e656"
}
.icon-internet:before{
    content:"\\e657"
}
.icon-internet-security:before{
    content:"\\e658"
}
.icon-internet-support:before{
    content:"\\e659"
}
.icon-upgrade-dial-up:before{
    content:"\\e65a"
}
.icon-ip-address:before{
    content:"\\e65b"
}
.icon-lan-switch:before{
    content:"\\e65c"
}
.icon-laptop:before{
    content:"\\e65d"
}
.icon-laptop-phone:before{
    content:"\\e65e"
}
.icon-live-chat-24x7:before{
    content:"\\e65f"
}
.icon-live-help:before{
    content:"\\e660"
}
.icon-load-balancer:before{
    content:"\\e661"
}
.icon-lock:before{
    content:"\\e662"
}
.icon-mail:before{
    content:"\\e663"
}
.icon-managed-phone:before{
    content:"\\e664"
}
.icon-managed-video-conferencing:before{
    content:"\\e665"
}
.icon-manage-services:before{
    content:"\\e666"
}
.icon-mms:before{
    content:"\\e667"
}
.icon-mobile:before{
    content:"\\e668"
}
.icon-prepaid-mobile-broadband:before{
    content:"\\e669"
}
.icon-mobile-broadband:before{
    content:"\\e66a"
}
.icon-mobile-byo:before{
    content:"\\e66b"
}
.icon-mobile-car-kit:before{
    content:"\\e66c"
}
.icon-mobile-data-pack:before{
    content:"\\e66d"
}
.icon-mobile-foxtel:before{
    content:"\\e66e"
}
.icon-mobile-insurance:before{
    content:"\\e66f"
}
.icon-mobile-mentor:before{
    content:"\\e670"
}
.icon-mobile-modem:before{
    content:"\\e671"
}
.icon-mobile-no-lock-in:before{
    content:"\\e672"
}
.icon-mobile-on-plan:before{
    content:"\\e673"
}
.icon-mobile-prepaid:before{
    content:"\\e674"
}
.icon-modem:before{
    content:"\\e675"
}
.icon-movies:before{
    content:"\\e676"
}
.icon-movies-hd:before{
    content:"\\e677"
}
.icon-multi-lay-switch:before{
    content:"\\e678"
}
.icon-music:before{
    content:"\\e679"
}
.icon-my-details:before{
    content:"\\e67a"
}
.icon-my-profile:before{
    content:"\\e67b"
}
.icon-my-profile-tick-presence:before{
    content:"\\e67c"
}
.icon-network-australia-wide:before{
    content:"\\e67d"
}
.icon-network-coverage:before{
    content:"\\e67e"
}
.icon-network-elem-managers:before{
    content:"\\e67f"
}
.icon-network-email:before{
    content:"\\e680"
}
.icon-network-speed:before{
    content:"\\e681"
}
.icon-news:before{
    content:"\\e682"
}
.icon-no-excess:before{
    content:"\\e683"
}
.icon-note:before{
    content:"\\e684"
}
.icon-operating-system:before{
    content:"\\e685"
}
.icon-operations-centre:before{
    content:"\\e686"
}
.icon-overseas-branch:before{
    content:"\\e687"
}
.icon-pay-online:before{
    content:"\\e688"
}
.icon-phone:before{
    content:"\\e689"
}
.icon-phone-add-features:before{
    content:"\\e68a"
}
.icon-phone-change-plans:before{
    content:"\\e68b"
}
.icon-phone-hd-voice:before{
    content:"\\e68c"
}
.icon-phone-ip:before{
    content:"\\e68d"
}
.icon-phone-office:before{
    content:"\\e68e"
}
.icon-phone-tipt:before{
    content:"\\e68f"
}
.icon-prepaid-activation:before{
    content:"\\e690"
}
.icon-prepaid-register:before{
    content:"\\e691"
}
.icon-price-promise:before{
    content:"\\e692"
}
.icon-print:before{
    content:"\\e693"
}
.icon-profile-suit:before{
    content:"\\e694"
}
.icon-public-safety-security:before{
    content:"\\e695"
}
.icon-puk-code:before{
    content:"\\e696"
}
.icon-recharge:before{
    content:"\\e697"
}
.icon-register:before{
    content:"\\e698"
}
.icon-research-insights:before{
    content:"\\e699"
}
.icon-router:before{
    content:"\\e69a"
}
.icon-search-find:before{
    content:"\\e69b"
}
.icon-secure-delivery:before{
    content:"\\e69c"
}
.icon-server:before{
    content:"\\e69d"
}
.icon-service-desk:before{
    content:"\\e69e"
}
.icon-service-status:before{
    content:"\\e69f"
}
.icon-settings:before{
    content:"\\e6a0"
}
.icon-shared-wifi:before{
    content:"\\e6a1"
}
.icon-shop-online:before{
    content:"\\e6a2"
}
.icon-shop-track-order:before{
    content:"\\e6a3"
}
.icon-sim-card:before{
    content:"\\e6a4"
}
.icon-sim-card-no-lock:before{
    content:"\\e6a5"
}
.icon-sip-connect:before{
    content:"\\e6a6"
}
.icon-small-business:before{
    content:"\\e6a7"
}
.icon-sms:before{
    content:"\\e6a8"
}
.icon-software-apps:before{
    content:"\\e6a9"
}
.icon-special-offer:before{
    content:"\\e6aa"
}
.icon-sports:before{
    content:"\\e6ab"
}
.icon-star:before{
    content:"\\e6ac"
}
.icon-storage:before{
    content:"\\e6ad"
}
.icon-support:before{
    content:"\\e6ae"
}
.icon-tablet:before{
    content:"\\e6af"
}
.icon-target:before{
    content:"\\e6b0"
}
.icon-tv:before{
    content:"\\e6b1"
}
.icon-tv-clear:before{
    content:"\\e713"
}
.icon-tbox:before{
    content:"\\e6b2"
}
.icon-telepres:before{
    content:"\\e6b3"
}
.icon-technologies:before{
    content:"\\e6b4"
}
.icon-teg-portal:before{
    content:"\\e6b5"
}
.icon-telstra-firewall:before{
    content:"\\e6b6"
}
.icon-telstra-lan-switch:before{
    content:"\\e6b7"
}
.icon-telstra-plus:before{
    content:"\\e6b8"
}
.icon-telstra-plus-home-support:before{
    content:"\\e6b9"
}
.icon-thub2:before{
    content:"\\e6ba"
}
.icon-tick-square:before{
    content:"\\e6bb"
}
.icon-thick-tick:before{
    content:"\\e6f7"
}
.icon-tick:before{
    content:"\\e6f8"
}
.icon-time:before{
    content:"\\e6bc"
}
.icon-transfer-data:before{
    content:"\\e6bd"
}
.icon-transfer-plan:before{
    content:"\\e6be"
}
.icon-twitter:before{
    content:"\\e6bf"
}
.icon-unified-comms:before{
    content:"\\e6c0"
}
.icon-unlock:before{
    content:"\\e6c1"
}
.icon-volume-off:before{
    content:"\\e6c2"
}
.icon-volume-on:before{
    content:"\\e6c3"
}
.icon-wan-accelerate:before{
    content:"\\e6c4"
}
.icon-warranty-2yr:before{
    content:"\\e6c5"
}
.icon-weather:before{
    content:"\\e6c6"
}
.icon-wireless-access-point:before{
    content:"\\e6c7"
}
.icon-telstra-router:before{
    content:"\\e6c8"
}
.icon-sess-border-control:before{
    content:"\\e6c9"
}
.icon-wireless-router:before{
    content:"\\e6ca"
}
.icon-facebook:before{
    content:"\\e6cb"
}
.icon-twitter-bird:before{
    content:"\\e6cc"
}
.icon-youtube:before{
    content:"\\e6cd"
}
.icon-telstra:before{
    content:"\\e6ce"
}
.icon-bigpond:before{
    content:"\\e6cf"
}
.icon-inventory-system:before{
    content:"\\e6d0"
}
.icon-research-evaluation:before{
    content:"\\e6d1"
}
.icon-sass:before{
    content:"\\e6d2"
}
.icon-teg:before{
    content:"\\e6d3"
}
.icon-infra-service-iaas:before{
    content:"\\e6d4"
}
.icon-number-one:before{
    content:"\\e600"
}
.icon-number-two:before{
    content:"\\e6d5"
}
.icon-number-three:before{
    content:"\\e6d6"
}
.icon-number-four:before{
    content:"\\e6d7"
}
.icon-number-five:before{
    content:"\\e6d8"
}
.icon-number-six:before{
    content:"\\e6d9"
}
.icon-number-seven:before{
    content:"\\e6da"
}
.icon-number-eight:before{
    content:"\\e6db"
}
.icon-number-nine:before{
    content:"\\e6dc"
}
.icon-number-ten:before{
    content:"\\e6dd"
}
.icon-ui-left-arrow-round:before{
    content:"\\e6fe"
}
.icon-ui-right-arrow-round:before{
    content:"\\e6ff"
}
.icon-ui-slider-button:before{
    content:"\\e705"
}
.icon-ui-cross:before{
    content:"\\e6de"
}
.icon-ui-plus:before{
    content:"\\e6df"
}
.icon-ui-minus:before{
    content:"\\e6e0"
}
.icon-ui-left-arrow-thick:before{
    content:"\\e6e1"
}
.icon-ui-right-arrow-thick:before{
    content:"\\e6e2"
}
.icon-ui-down-arrow-thick:before{
    content:"\\e6e3"
}
.icon-ui-up-arrow-thick:before{
    content:"\\e6e4"
}
.icon-ui-left-arrow:before{
    content:"\\e6f3"
}
.icon-ui-right-arrow:before{
    content:"\\e6f4"
}
.icon-ui-down-arrow:before{
    content:"\\e6f5"
}
.icon-ui-up-arrow:before{
    content:"\\e6f6"
}
.icon-ui-play:before{
    content:"\\e6e5"
}
.icon-ui-pause:before{
    content:"\\e6e6"
}
.icon-ui-stop:before{
    content:"\\e6e7"
}
.icon-ui-replay:before{
    content:"\\e6e8"
}
.icon-ui-start:before{
    content:"\\e6e9"
}
.icon-ui-end:before{
    content:"\\e6ea"
}
.icon-ui-rewind:before{
    content:"\\e6eb"
}
.icon-ui-fast-forward:before{
    content:"\\e6ec"
}
.icon-ui-left-arrow-button:before{
    content:"\\e6ed"
}
.icon-ui-right-arrow-button:before{
    content:"\\e6ee"
}
.icon-ui-down-arrow-button:before{
    content:"\\e6ef"
}
.icon-ui-up-arrow-button:before{
    content:"\\e6f0"
}
.icon-ui-play-button:before{
    content:"\\e6f1"
}
.icon-ui-search:before{
    content:"\\e6f2"
}
.icon-retail-store:before{
    content:"\\e717"
}
.icon-flagship-store:before{
    content:"\\e718"
}
.base-orange .tcom-theme-bg-primary{
    background-color:#e83319 !important
}
.base-purple .tcom-theme-bg-primary{
    background-color:#8779b7 !important
}
.base-turquoise .tcom-theme-bg-primary{
    background-color:#00a6a4 !important
}
.base-green .tcom-theme-bg-primary{
    background-color:#13a129 !important
}
.base-magenta .tcom-theme-bg-primary{
    background-color:#c31b96 !important
}
.base-blue .tcom-theme-bg-primary{
    background-color:#00aaf3 !important
}
.base-default .tcom-theme-bg-primary{
    background-color:#00aaf3 !important
}
.base-orange .tcom-theme-bg-secondary{
    background-color:#bb2914 !important
}
.base-purple .tcom-theme-bg-secondary{
    background-color:#4c479f !important
}
.base-turquoise .tcom-theme-bg-secondary{
    background-color:#227e7d !important
}
.base-green .tcom-theme-bg-secondary{
    background-color:#1d5f27 !important
}
.base-magenta .tcom-theme-bg-secondary{
    background-color:#841f8d !important
}
.base-blue .tcom-theme-bg-secondary{
    background-color:#1964c8 !important
}
.base-default .tcom-theme-bg-secondary{
    background-color:#1964c8 !important
}
.base-orange .tcom-theme-bg-0{
    background-color:#ec5600 !important
}
.base-purple .tcom-theme-bg-0{
    background-color:#7c69b8 !important
}
.base-turquoise .tcom-theme-bg-0{
    background-color:#29a4a2 !important
}
.base-green .tcom-theme-bg-0{
    background-color:#00cc33 !important
}
.base-magenta .tcom-theme-bg-0{
    background-color:#e8398d !important
}
.base-blue .tcom-theme-bg-0{
    background-color:#00b4ff !important
}
.base-default .tcom-theme-bg-0{
    background-color:#00b4ff !important
}
.base-orange .tcom-theme-bg-33{
    background-color:#c43f10
}
.base-purple .tcom-theme-bg-33{
    background-color:#624ea4
}
.base-turquoise .tcom-theme-bg-33{
    background-color:#1f8381
}
.base-green .tcom-theme-bg-33{
    background-color:#02a332
}
.base-magenta .tcom-theme-bg-33{
    background-color:#b6327f
}
.base-blue .tcom-theme-bg-33{
    background-color:#0d89cf
}
.base-default .tcom-theme-bg-33{
    background-color:#0d89cf
}
.base-orange .tcom-theme-bg-50{
    background-color:#b03318
}
.base-purple .tcom-theme-bg-50{
    background-color:#55409a
}
.base-turquoise .tcom-theme-bg-50{
    background-color:#1a7270
}
.base-green .tcom-theme-bg-50{
    background-color:#048e32
}
.base-magenta .tcom-theme-bg-50{
    background-color:#9c2f78
}
.base-blue .tcom-theme-bg-50{
    background-color:#1374b7
}
.base-default .tcom-theme-bg-50{
    background-color:#1374b7
}
.base-orange .tcom-theme-bg-66{
    background-color:#9d2820
}
.base-purple .tcom-theme-bg-66{
    background-color:#483390
}
.base-turquoise .tcom-theme-bg-66{
    background-color:#15625f
}
.base-green .tcom-theme-bg-66{
    background-color:#057a31
}
.base-magenta .tcom-theme-bg-66{
    background-color:#842b71
}
.base-blue .tcom-theme-bg-66{
    background-color:#195f9f
}
.base-default .tcom-theme-bg-66{
    background-color:#195f9f
}
.base-orange .tcom-theme-bg-100{
    background-color:#741030 !important
}
.base-purple .tcom-theme-bg-100{
    background-color:#2d177b !important
}
.base-turquoise .tcom-theme-bg-100{
    background-color:#0a403d !important
}
.base-green .tcom-theme-bg-100{
    background-color:#074f30 !important
}
.base-magenta .tcom-theme-bg-100{
    background-color:#502462 !important
}
.base-blue .tcom-theme-bg-100{
    background-color:#26336e !important
}
.base-default .tcom-theme-bg-100{
    background-color:#26336e !important
}
.base-orange .tcom-theme-bg-133{
    background-color:#470a1d
}
.base-purple .tcom-theme-bg-133{
    background-color:#1d0f50
}
.base-turquoise .tcom-theme-bg-133{
    background-color:#031413
}
.base-green .tcom-theme-bg-133{
    background-color:#032014
}
.base-magenta .tcom-theme-bg-133{
    background-color:#32163d
}
.base-blue .tcom-theme-bg-133{
    background-color:#192148
}
.base-default .tcom-theme-bg-133{
    background-color:#192148
}
.base-orange .tcom-theme-bg-primary-secondary{
    background-color:#bb2914 !important;
    background:linear-gradient(to right, #e83319 0, #bb2914 100%)
}
.base-purple .tcom-theme-bg-primary-secondary{
    background-color:#4c479f !important;
    background:linear-gradient(to right, #8779b7 0, #4c479f 100%)
}
.base-turquoise .tcom-theme-bg-primary-secondary{
    background-color:#227e7d !important;
    background:linear-gradient(to right, #00a6a4 0, #227e7d 100%)
}
.base-green .tcom-theme-bg-primary-secondary{
    background-color:#1d5f27 !important;
    background:linear-gradient(to right, #13a129 0, #1d5f27 100%)
}
.base-magenta .tcom-theme-bg-primary-secondary{
    background-color:#841f8d !important;
    background:linear-gradient(to right, #c31b96 0, #841f8d 100%)
}
.base-blue .tcom-theme-bg-primary-secondary{
    background-color:#1964c8 !important;
    background:linear-gradient(to right, #00aaf3 0, #1964c8 100%)
}
.base-default .tcom-theme-bg-primary-secondary{
    background-color:#1964c8 !important;
    background:linear-gradient(to right, #00aaf3 0, #1964c8 100%)
}
.base-orange .tcom-theme-bg-start-end{
    background-color:#bb2914 !important;
    background:linear-gradient(to right, #ec5600 0, #741030 100%)
}
.base-purple .tcom-theme-bg-start-end{
    background-color:#4c479f !important;
    background:linear-gradient(to right, #7c69b8 0, #2d177b 100%)
}
.base-turquoise .tcom-theme-bg-start-end{
    background-color:#227e7d !important;
    background:linear-gradient(to right, #29a4a2 0, #0a403d 100%)
}
.base-green .tcom-theme-bg-start-end{
    background-color:#1d5f27 !important;
    background:linear-gradient(to right, #00cc33 0, #074f30 100%)
}
.base-magenta .tcom-theme-bg-start-end{
    background-color:#841f8d !important;
    background:linear-gradient(to right, #e8398d 0, #502462 100%)
}
.base-blue .tcom-theme-bg-start-end{
    background-color:#1964c8 !important;
    background:linear-gradient(to right, #00b4ff 0, #26336e 100%)
}
.base-default .tcom-theme-bg-start-end{
    background-color:#1964c8 !important;
    background:linear-gradient(to right, #00b4ff 0, #26336e 100%)
}
.base-orange .tcom-theme-bg-vertical-start-end-70{
    background-image:none !important;
    background-color:#ec5600;
    background:linear-gradient(to bottom, #ec5600 0, #741030 70%) !important
}
.base-purple .tcom-theme-bg-vertical-start-end-70{
    background-image:none !important;
    background-color:#7c69b8;
    background:linear-gradient(to bottom, #7c69b8 0, #2d177b 70%) !important
}
.base-turquoise .tcom-theme-bg-vertical-start-end-70{
    background-image:none !important;
    background-color:#29a4a2;
    background:linear-gradient(to bottom, #29a4a2 0, #0a403d 70%) !important
}
.base-green .tcom-theme-bg-vertical-start-end-70{
    background-image:none !important;
    background-color:#00cc33;
    background:linear-gradient(to bottom, #00cc33 0, #074f30 70%) !important
}
.base-magenta .tcom-theme-bg-vertical-start-end-70{
    background-image:none !important;
    background-color:#e8398d;
    background:linear-gradient(to bottom, #e8398d 0, #502462 70%) !important
}
.base-blue .tcom-theme-bg-vertical-start-end-70{
    background-image:none !important;
    background-color:#00b4ff;
    background:linear-gradient(to bottom, #00b4ff 0, #26336e 70%) !important
}
.base-default .tcom-theme-bg-vertical-start-end-70{
    background-image:none !important;
    background-color:#00b4ff;
    background:linear-gradient(to bottom, #00b4ff 0, #26336e 70%) !important
}
.base-orange .tcom-theme-fg-primary{
    color:#e83319
}
.base-purple .tcom-theme-fg-primary{
    color:#8779b7
}
.base-turquoise .tcom-theme-fg-primary{
    color:#00a6a4
}
.base-green .tcom-theme-fg-primary{
    color:#13a129
}
.base-magenta .tcom-theme-fg-primary{
    color:#c31b96
}
.base-blue .tcom-theme-fg-primary{
    color:#00aaf3
}
.base-default .tcom-theme-fg-primary{
    color:#00aaf3
}
.base-orange .tcom-theme-fg-secondary{
    color:#bb2914
}
.base-purple .tcom-theme-fg-secondary{
    color:#4c479f
}
.base-turquoise .tcom-theme-fg-secondary{
    color:#227e7d
}
.base-green .tcom-theme-fg-secondary{
    color:#1d5f27
}
.base-magenta .tcom-theme-fg-secondary{
    color:#841f8d
}
.base-blue .tcom-theme-fg-secondary{
    color:#1964c8
}
.base-default .tcom-theme-fg-secondary{
    color:#1964c8
}
.base-orange .tcom-theme-fg-0{
    color:#ec5600
}
.base-purple .tcom-theme-fg-0{
    color:#7c69b8
}
.base-turquoise .tcom-theme-fg-0{
    color:#29a4a2
}
.base-green .tcom-theme-fg-0{
    color:#00cc33
}
.base-magenta .tcom-theme-fg-0{
    color:#e8398d
}
.base-blue .tcom-theme-fg-0{
    color:#00b4ff
}
.base-default .tcom-theme-fg-0{
    color:#00b4ff
}
.base-orange .tcom-theme-fg-33{
    color:#c43f10
}
.base-purple .tcom-theme-fg-33{
    color:#624ea4
}
.base-turquoise .tcom-theme-fg-33{
    color:#1f8381
}
.base-green .tcom-theme-fg-33{
    color:#02a332
}
.base-magenta .tcom-theme-fg-33{
    color:#b6327f
}
.base-blue .tcom-theme-fg-33{
    color:#0d89cf
}
.base-default .tcom-theme-fg-33{
    color:#0d89cf
}
.base-orange .tcom-theme-fg-50{
    color:#b03318
}
.base-purple .tcom-theme-fg-50{
    color:#55409a
}
.base-turquoise .tcom-theme-fg-50{
    color:#1a7270
}
.base-green .tcom-theme-fg-50{
    color:#048e32
}
.base-magenta .tcom-theme-fg-50{
    color:#9c2f78
}
.base-blue .tcom-theme-fg-50{
    color:#1374b7
}
.base-default .tcom-theme-fg-50{
    color:#1374b7
}
.base-orange .tcom-theme-fg-66{
    color:#9d2820
}
.base-purple .tcom-theme-fg-66{
    color:#483390
}
.base-turquoise .tcom-theme-fg-66{
    color:#15625f
}
.base-green .tcom-theme-fg-66{
    color:#057a31
}
.base-magenta .tcom-theme-fg-66{
    color:#842b71
}
.base-blue .tcom-theme-fg-66{
    color:#195f9f
}
.base-default .tcom-theme-fg-66{
    color:#195f9f
}
.base-orange .tcom-theme-fg-100{
    color:#741030
}
.base-purple .tcom-theme-fg-100{
    color:#2d177b
}
.base-turquoise .tcom-theme-fg-100{
    color:#0a403d
}
.base-green .tcom-theme-fg-100{
    color:#074f30
}
.base-magenta .tcom-theme-fg-100{
    color:#502462
}
.base-blue .tcom-theme-fg-100{
    color:#26336e
}
.base-default .tcom-theme-fg-100{
    color:#26336e
}
.base-orange .theme-primary{
    color:#fff;
    background-color:#e83319
}
.base-purple .theme-primary{
    color:#fff;
    background-color:#8779b7
}
.base-turquoise .theme-primary{
    color:#fff;
    background-color:#00a6a4
}
.base-green .theme-primary{
    color:#fff;
    background-color:#13a129
}
.base-magenta .theme-primary{
    color:#fff;
    background-color:#c31b96
}
.base-blue .theme-primary{
    color:#fff;
    background-color:#00aaf3
}
.base-default .theme-primary{
    color:#fff;
    background-color:#00aaf3
}
.base-orange .theme-secondary{
    color:#fff;
    background-color:#bb2914
}
.base-purple .theme-secondary{
    color:#fff;
    background-color:#4c479f
}
.base-turquoise .theme-secondary{
    color:#fff;
    background-color:#227e7d
}
.base-green .theme-secondary{
    color:#fff;
    background-color:#1d5f27
}
.base-magenta .theme-secondary{
    color:#fff;
    background-color:#841f8d
}
.base-blue .theme-secondary{
    color:#fff;
    background-color:#1964c8
}
.base-default .theme-secondary{
    color:#fff;
    background-color:#1964c8
}
.base-orange .theme-grad-1{
    color:#333;
    background-color:#fce6da
}
.base-purple .theme-grad-1{
    color:#333;
    background-color:#eceef6
}
.base-turquoise .theme-grad-1{
    color:#333;
    background-color:#dfeff0
}
.base-green .theme-grad-1{
    color:#333;
    background-color:#deeddf
}
.base-magenta .theme-grad-1{
    color:#333;
    background-color:#fae1ee
}
.base-blue .theme-grad-1{
    color:#333;
    background-color:#e1eef8
}
.base-default .theme-grad-1{
    color:#333;
    background-color:#e1eef8
}
.base-orange .theme-grad-2{
    color:#fff;
    background-color:#ec5600
}
.base-purple .theme-grad-2{
    color:#fff;
    background-color:#7c69b8
}
.base-turquoise .theme-grad-2{
    color:#fff;
    background-color:#29a4a2
}
.base-green .theme-grad-2{
    color:#fff;
    background-color:#00cc33
}
.base-magenta .theme-grad-2{
    color:#fff;
    background-color:#e8398d
}
.base-blue .theme-grad-2{
    color:#fff;
    background-color:#00b4ff
}
.base-default .theme-grad-2{
    color:#fff;
    background-color:#00b4ff
}
.base-orange .theme-grad-3{
    color:#fff;
    background-color:#ee4126
}
.base-purple .theme-grad-3{
    color:#fff;
    background-color:#644ab8
}
.base-turquoise .theme-grad-3{
    color:#fff;
    background-color:#008d8a
}
.base-green .theme-grad-3{
    color:#fff;
    background-color:#22a737
}
.base-magenta .theme-grad-3{
    color:#fff;
    background-color:#cf156f
}
.base-blue .theme-grad-3{
    color:#fff;
    background-color:#2d86ca
}
.base-default .theme-grad-3{
    color:#fff;
    background-color:#2d86ca
}
.base-orange .theme-grad-4{
    color:#fff;
    background-color:#d62828
}
.base-purple .theme-grad-4{
    color:#fff;
    background-color:#513d9a
}
.base-turquoise .theme-grad-4{
    color:#fff;
    background-color:#007a78
}
.base-green .theme-grad-4{
    color:#fff;
    background-color:#058b38
}
.base-magenta .theme-grad-4{
    color:#fff;
    background-color:#c01f8a
}
.base-blue .theme-grad-4{
    color:#fff;
    background-color:#2c74d3
}
.base-default .theme-grad-4{
    color:#fff;
    background-color:#2c74d3
}
.base-orange .theme-grad-5{
    color:#fff;
    background-color:#a31945
}
.base-purple .theme-grad-5{
    color:#fff;
    background-color:#422d8d
}
.base-turquoise .theme-grad-5{
    color:#fff;
    background-color:#0b5854
}
.base-green .theme-grad-5{
    color:#fff;
    background-color:#1c734e
}
.base-magenta .theme-grad-5{
    color:#fff;
    background-color:#9a2685
}
.base-blue .theme-grad-5{
    color:#fff;
    background-color:#1a5199
}
.base-default .theme-grad-5{
    color:#fff;
    background-color:#1a5199
}
.base-orange .theme-grad-6{
    color:#fff;
    background-color:#741030
}
.base-purple .theme-grad-6{
    color:#fff;
    background-color:#2d177b
}
.base-turquoise .theme-grad-6{
    color:#fff;
    background-color:#0a403d
}
.base-green .theme-grad-6{
    color:#fff;
    background-color:#074f30
}
.base-magenta .theme-grad-6{
    color:#fff;
    background-color:#502462
}
.base-blue .theme-grad-6{
    color:#fff;
    background-color:#26336e
}
.base-default .theme-grad-6{
    color:#fff;
    background-color:#26336e
}
.base-orange .theme-gradient-primary-secondary{
    color:#fff;
    background-color:#e83319;
    background:linear-gradient(to right, #e83319 0, #bb2914 100%)
}
.base-purple .theme-gradient-primary-secondary{
    color:#fff;
    background-color:#8779b7;
    background:linear-gradient(to right, #8779b7 0, #4c479f 100%)
}
.base-turquoise .theme-gradient-primary-secondary{
    color:#fff;
    background-color:#00a6a4;
    background:linear-gradient(to right, #00a6a4 0, #227e7d 100%)
}
.base-green .theme-gradient-primary-secondary{
    color:#fff;
    background-color:#13a129;
    background:linear-gradient(to right, #13a129 0, #1d5f27 100%)
}
.base-magenta .theme-gradient-primary-secondary{
    color:#fff;
    background-color:#c31b96;
    background:linear-gradient(to right, #c31b96 0, #841f8d 100%)
}
.base-blue .theme-gradient-primary-secondary{
    color:#fff;
    background-color:#00aaf3;
    background:linear-gradient(to right, #00aaf3 0, #1964c8 100%)
}
.base-default .theme-gradient-primary-secondary{
    color:#fff;
    background-color:#00aaf3;
    background:linear-gradient(to right, #00aaf3 0, #1964c8 100%)
}
.base-orange .theme-gradient-secondary-primary{
    color:#fff;
    background-color:#bb2914;
    background:linear-gradient(to right, #bb2914 0, #e83319 100%)
}
.base-purple .theme-gradient-secondary-primary{
    color:#fff;
    background-color:#4c479f;
    background:linear-gradient(to right, #4c479f 0, #8779b7 100%)
}
.base-turquoise .theme-gradient-secondary-primary{
    color:#fff;
    background-color:#227e7d;
    background:linear-gradient(to right, #227e7d 0, #00a6a4 100%)
}
.base-green .theme-gradient-secondary-primary{
    color:#fff;
    background-color:#1d5f27;
    background:linear-gradient(to right, #1d5f27 0, #13a129 100%)
}
.base-magenta .theme-gradient-secondary-primary{
    color:#fff;
    background-color:#841f8d;
    background:linear-gradient(to right, #841f8d 0, #c31b96 100%)
}
.base-blue .theme-gradient-secondary-primary{
    color:#fff;
    background-color:#1964c8;
    background:linear-gradient(to right, #1964c8 0, #00aaf3 100%)
}
.base-default .theme-gradient-secondary-primary{
    color:#fff;
    background-color:#1964c8;
    background:linear-gradient(to right, #1964c8 0, #00aaf3 100%)
}
.base-orange .theme-gradient-vertical-primary-secondary{
    color:#fff;
    background-color:#e83319;
    background:linear-gradient(to bottom, #e83319 0, #bb2914 100%)
}
.base-purple .theme-gradient-vertical-primary-secondary{
    color:#fff;
    background-color:#8779b7;
    background:linear-gradient(to bottom, #8779b7 0, #4c479f 100%)
}
.base-turquoise .theme-gradient-vertical-primary-secondary{
    color:#fff;
    background-color:#00a6a4;
    background:linear-gradient(to bottom, #00a6a4 0, #227e7d 100%)
}
.base-green .theme-gradient-vertical-primary-secondary{
    color:#fff;
    background-color:#13a129;
    background:linear-gradient(to bottom, #13a129 0, #1d5f27 100%)
}
.base-magenta .theme-gradient-vertical-primary-secondary{
    color:#fff;
    background-color:#c31b96;
    background:linear-gradient(to bottom, #c31b96 0, #841f8d 100%)
}
.base-blue .theme-gradient-vertical-primary-secondary{
    color:#fff;
    background-color:#00aaf3;
    background:linear-gradient(to bottom, #00aaf3 0, #1964c8 100%)
}
.base-default .theme-gradient-vertical-primary-secondary{
    color:#fff;
    background-color:#00aaf3;
    background:linear-gradient(to bottom, #00aaf3 0, #1964c8 100%)
}
.base-orange .theme-gradient-vertical-secondary-primary{
    color:#fff;
    background-color:#bb2914;
    background:linear-gradient(to top, #e83319 0, #bb2914 100%)
}
.base-purple .theme-gradient-vertical-secondary-primary{
    color:#fff;
    background-color:#4c479f;
    background:linear-gradient(to top, #8779b7 0, #4c479f 100%)
}
.base-turquoise .theme-gradient-vertical-secondary-primary{
    color:#fff;
    background-color:#227e7d;
    background:linear-gradient(to top, #00a6a4 0, #227e7d 100%)
}
.base-green .theme-gradient-vertical-secondary-primary{
    color:#fff;
    background-color:#1d5f27;
    background:linear-gradient(to top, #13a129 0, #1d5f27 100%)
}
.base-magenta .theme-gradient-vertical-secondary-primary{
    color:#fff;
    background-color:#841f8d;
    background:linear-gradient(to top, #c31b96 0, #841f8d 100%)
}
.base-blue .theme-gradient-vertical-secondary-primary{
    color:#fff;
    background-color:#1964c8;
    background:linear-gradient(to top, #00aaf3 0, #1964c8 100%)
}
.base-default .theme-gradient-vertical-secondary-primary{
    color:#fff;
    background-color:#1964c8;
    background:linear-gradient(to top, #00aaf3 0, #1964c8 100%)
}
.base-orange .theme-text-primary{
    color:#e83319 !important;
}
.base-purple .theme-text-primary{
    color:#8779b7 !important;
}
.base-turquoise .theme-text-primary{
    color:#00a6a4 !important;
}
.base-green .theme-text-primary{
    color:#13a129 !important;
}
.base-magenta .theme-text-primary{
    color:#c31b96 !important;
}
.base-blue .theme-text-primary{
    color:#00aaf3 !important;
}
.base-default .theme-text-primary{
    color:#00aaf3 !important;
}
.base-orange .theme-text-secondary{
    color:#bb2914
}
.base-grey .theme-text-secondary {
    color:#949494 !important;
}
.base-purple .theme-text-secondary{
    color:#4c479f
}
.base-turquoise .theme-text-secondary{
    color:#227e7d
}
.base-green .theme-text-secondary{
    color:#1d5f27
}
.base-magenta .theme-text-secondary{
    color:#841f8d
}
.base-blue .theme-text-secondary{
    color:#1964c8
}
.base-default .theme-text-secondary{
    color:#1964c8
}
.base-orange .featured-gradient{
    background:linear-gradient(149deg, #dd0b30 -120%, #db0f2e -6%, rgba(229,195,222,0.00001) 43%),linear-gradient(45deg, #b61d68 4%, #ec6407 50%, #ffab09 90%)
}
.base-purple .featured-gradient{
    background:linear-gradient(160deg, #2996d4 -10%, #4b3789 -20%, rgba(229,195,222,0.000001) 50%),linear-gradient(73deg, #99529a 3%, #8cb5e0 56%, #0bbbff 90%)
}
.base-turquoise .featured-gradient{
    background:linear-gradient(152deg, #00686f -8%, rgba(0,104,111,0.0001) 55%, rgba(0,104,111,0) 100%),linear-gradient(255deg, #a7cc64 14%, #35b4c2 57%, #26ceff 107%)
}
.base-green .featured-gradient{
    background:linear-gradient(200deg, #006a72 0, rgba(229,195,222,0.000001) 54%),linear-gradient(285deg, #26c0eb 15%, #16afe9 40%, #06b5b8 53%, #a4c95f 90%)
}
.base-magenta .featured-gradient{
    background:linear-gradient(168deg, #8e397f -10%, rgba(135,55,124,0.25) 10%, rgba(229,195,222,0.15) 40%, rgba(229,195,222,0.1) 53%),linear-gradient(112deg, #87377c, #d40983 32.1%, #ff8d18 90%)
}
.base-blue .featured-gradient{
    background:linear-gradient(198deg, #2996d4 -10%, #4b3789 -11%, rgba(229,195,222,0.000001) 55%),linear-gradient(283deg, #99529a 7%, #8cb5e0 64%, #0bbbff 100%)
}
.base-default .featured-gradient{
    background:linear-gradient(198deg, #2996d4 -10%, #4b3789 -11%, rgba(229,195,222,0.000001) 55%),linear-gradient(283deg, #99529a 7%, #8cb5e0 64%, #0bbbff 100%)
}
.base-grey .featured-gradient {
 color: #fff;
    background-color: #aaaaaa;
    background: linear-gradient(to right,#828282 0,#bfbfbf 100%);
}
.base-grey .theme-gradient-primary-secondary {
    color: #fff;
    background-color: #aaaaaa;
    background: linear-gradient(to right,#828282 0,#bfbfbf 100%);
}
.spectrum {
    position:absolute;
    display:block;
    width:100%;
    height:562px;
    max-height:562px;
    margin-top:56px;
    background-position:top;
    background-repeat:no-repeat;
    background-image:url(${spectrum});
    z-index: -1;
    
}

.spectrum-bottom {
    height: -webkit-fill-available;
    background-attachment: unset;
    background-position: top;
    margin-top: 0px;
    bottom: 0;
    /* height: 156px;*/
    position: fixed;
    opacity: 0.8;
}

body {
    background-image:url(${spectrumBg});
    background-repeat: no-repeat;
    background-size: contain;
    background-attachment: fixed;
}

#custom-count-circle{
    height: 40px;
    width: 40px;
    padding: 4px;
    // background-color: #949494;
    color: #4e3d46ad;
}

#custom-count-circle::before {
    content: '';
    position: absolute;
    margin-left: 50%;
    margin-top: 50%;
    transform: translate(-50%, -50%);
    border: #4e3d46ad 3px solid;
    border-radius: 100%;
    width: 100%;
    height: 100%;
}

#custom-count-circle::after {
    content: attr(data-value);
    position: absolute;
    margin-left: 50%;
    margin-top: 52%;
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    font-family: TelstraGravurWeb-Light;
    // font-size: 28px; 
}
`;

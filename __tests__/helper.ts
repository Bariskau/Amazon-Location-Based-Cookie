import { CookieOutput } from '../src/types';

export const csrfVerifyUrl = '/portal-migration/hz/glow/get-rendered-address-selections?deviceType=desktop&pageType=Gateway&storeContext=NoStoreName&actionSource=desktop-modal'

export const mainRequestResponse = {
  data: `
  <span id="nav-global-location-data-modal-action"
    class="a-declarative nav-progressive-attribute"
    data-a-modal="{&quot;width&quot;:375, &quot;closeButton&quot;:&quot;false&quot;,&quot;popoverLabel&quot;:&quot;Lorem ipsum&quot;, &quot;ajaxHeaders&quot;:{&quot;anti-csrftoken-a2z&quot;:&quot;;a2zToken&quot;}, &quot;name&quot;:&quot;glow-modal&quot;, &quot;url&quot;:&quot;/portal-migration/hz/glow/get-rendered-address-selections?deviceType=desktop&amp;pageType=Gateway&amp;storeContext=NoStoreName&amp;actionSource=desktop-modal&quot;, &quot;footer&quot;:null,&quot;header&quot;:&quot;Lorem ipsum&quot;}"
    data-action="a-modal">
  </span>
  `,
  headers: {
    'set-cookie': [
      'session-id=mock_one; Domain=.amazon.com; Secure',
      'session-id-time=mock_one; Domain=.amazon.com; Secure',
    ],
  },
};

export const csrfTokenResponse = {
  data: '<script type="text/javascript">P.now("GLUXWidget").execute(function(GLUXWidget){ if(GLUXWidget===undefined){P.declare("GLUXWidget", {CSRF_TOKEN : "csrf_token"});</script>',
  headers: {
    'set-cookie': [
      'ubid-main=131-8956994-2360027; Secure',
    ],
  },
};

export const addressChangeResponse = {
  data: {
    isValidAddress: 1,
  },
  headers: {
    'set-cookie': [
      'session-id=mock_one; Domain=.amazon.com; Secure',
      'session-id-time=mock_one; Domain=.amazon.com; Secure',
    ],
  },
};

export const serviceOutput: CookieOutput = {
  addressChanged: true,
  cookie: 'session-id=mock_one; session-id-time=mock_one',
};


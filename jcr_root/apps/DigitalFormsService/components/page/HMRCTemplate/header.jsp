<%------------------------------------------------------------------------
 ~
 ~ ADOBE CONFIDENTIAL
 ~ __________________
 ~
 ~  Copyright 2014 Adobe Systems Incorporated
 ~  All Rights Reserved.
 ~
 ~ NOTICE:  All information contained herein is, and remains
 ~ the property of Adobe Systems Incorporated and its suppliers,
 ~ if any.  The intellectual and technical concepts contained
 ~ herein are proprietary to Adobe Systems Incorporated and its
 ~ suppliers and may be covered by U.S. and Foreign Patents,
 ~ patents in process, and are protected by trade secret or copyright law.
 ~ Dissemination of this information or reproduction of this material
 ~ is strictly forbidden unless prior written permission is obtained
 ~ from Adobe Systems Incorporated.
 --------------------------------------------------------------------------%>

<%@include file="/libs/fd/af/components/guidesglobal.jsp"%>
<%
    I18n i18n = new I18n(slingRequest);
%>

<header role="banner" id="global-header">
	<div class="header-wrapper">
		<div id="skiplink-container">
          <div>
            <a href="javascript:;" id="skip" class="skiplink" tabindex="0">Skip to main content</a>
          </div>
        </div>
        <div class="header-global">
            <div class="header-logo">
               <a href="https://www.gov.uk/" title="Go to the GOV.UK homepage" id="logo" class="content"><img src="/etc/designs/DigitalFormsService/af/default/hmrclibs/images/crown.png" alt="">GOV.UK</a>
            </div>
            <div class="banner-title">
                <% if(resource != null && resource.getChild("guideformtitle") != null) {%>
                <sling:include path="guideformtitle"/>
                <% } %>
            </div>

        </div>

    </div>

</header>
<div id="service-bar"><div id="inner"></div></div>

<div id="phase-notice">

   <p><strong class="beta">BETA</strong>
    This is a new service - your <a href="https://www.tax.service.gov.uk/contact/beta-feedback-unauthenticated" target="_blank">feedback</a> will help us to improve it.</p>
    <div id="bottom-line"></div>
</div>



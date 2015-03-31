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

<%---- Mobile nav bar -----%>
<%---- check if in edit mode and display it. If not in edit mode, hide navbar -----%>
<%----------<c:if test="${isEditMode}">
    <div class="visible-xs">
        	<cq:include path="${guideContainer.rootPanel.path}"
                    resourceType = "navStep.jsp" />
    </div>
    <div id="guide-mobile-navigator-wrapper">
        <div class="row">
            <div class="clearfix visible-xs">
                <button type="button" class="navigator-toggle collapsed" data-toggle="collapse"
                        data-target="#guide-mobile-navigator" aria-label="menu">
                    <span class="glyphicon glyphicon-align-justify"></span>
                </button>
            </div>
        </div>
        <div id="guide-mobile-navigator" class="visible-xs collapse">
            <cq:include path="${guideContainer.rootPanel.path}"
                        resourceType="/libs/fd/af/layouts/mobile/common/navMenu.jsp"/>
        </div>
    </div>
    <div class="guide-header-bar-wrapper">
        <cq:include script="/libs/fd/af/layouts/mobile/common/navBar.jsp"/>
    </div>
</c:if>----------%>

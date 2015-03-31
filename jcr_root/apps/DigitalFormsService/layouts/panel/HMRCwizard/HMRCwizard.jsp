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


<div id="${guidePanel.id}_layoutContainer" class="row" style="position:relative;">

    <c:if test="${isEditMode}">
        <!--navigation progress bar -->
        <div class="col-md-12 clearfix">
            <cq:include script = "defaultNavigatorLayout.jsp" />
        </div>
        <%------<div class="col-md-1 col-sm-1 wizard-nav-arrow wizard-nav-prev"
             data-guide-wizard-nav="${guidePanel.id}"
             data-guide-wizard-nav-type="prevItem">
        </div>-----%>
    </c:if>

    <!-- Form container -->
    <div id="#${guidePanel.id}_layoutPanelContainer" class="col-md-12 col-sm-12 PanelContainer">
        <c:if test="${fn:length(guidePanel.description) > 0}">
            <div class="<%=GuideConstants.GUIDE_PANEL_DESCRIPTION%>">
                ${guide:encodeForHtml(guidePanel.description,xssAPI)}
                <cq:include script="/libs/fd/af/components/panel/longDescription.jsp"/>
            </div>
        </c:if>
        <cq:include script = "panelContainer.jsp"/>
    </div>

	<%------<c:if test="${isEditMode}">
        <div class="col-md-1 col-sm-1 wizard-nav-arrow wizard-nav-next"
             data-guide-wizard-nav="${guidePanel.id}"
             data-guide-wizard-nav-type="nextItem">
        </div>
    </c:if>-----%>
</div>

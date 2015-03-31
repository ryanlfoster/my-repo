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

<%@ page import="com.adobe.aemds.guide.utils.GuideConstants" %>
<%--
  Link Component
--%>
<%@include file="/libs/fd/af/components/guidesglobal.jsp" %>
<%GuideNode guideField =(GuideNode) request.getAttribute("guideField");%>
<div class="<%= GuideConstants.GUIDE_FIELD_WIDGET%>" style="${guide:encodeForHtmlAttr(guideField.styles,xssAPI)}">

    <div class="${guideField.type}" id="${guideid}${'_widget'}"
    name="${guide:encodeForHtmlAttr(guideField.name,xssAPI)}" style="position: relative;">

        <span class="iconButton-icon"></span>
        <span class="iconButton-label"><a href="javascript:void(0)" disabled="disabled" >${guide:encodeForHtml(guideField.title,xssAPI)}</a> </span>
    </div>

    <%-- End of Widget Div --%>
</div>

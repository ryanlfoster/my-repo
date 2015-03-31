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
<%@ page import="com.adobe.aemds.guide.utils.StyleUtils" %>

<div class="col-md-12 col-sm-12">
    <%-- navigation tabs --%>
    <ol id="${guidePanel.id}_guide-item-nav-container"
     	class="wizard-navigators ${guideLayoutContext.layoutNavigatorClasses} /*hidden-xs*/"
        data-guide-panel-edit="reorderItems" role="tablist" style="display: inline-block;">

        <c:forEach items="${guidePanel.items}" var="panelItem">
            <li id="${panelItem.id}_guide-item-nav" title="${guide:encodeForHtmlAttr(panelItem.navTitle,xssAPI)}" data-path="${panelItem.path}" role="tab" aria-controls="${panelItem.id}_guide-item"
            style="width:auto; display: inline-block;">
                <c:set var="panelItemCss" value="${panelItem.cssClassName}"/>
                <% String panelItemCss = (String) pageContext.getAttribute("panelItemCss");%>
                <a
                    <c:if test="${isEditMode}">
                        data-guide-toggle="tab"
                    </c:if>
                    class="<%= StyleUtils.addPostfixToClasses(panelItemCss, "_nav") %> guideNavIcon">
                    <span>${guide:encodeForHtml(panelItem.navTitle,xssAPI)}</span>
                </a>
            </li>
        </c:forEach>
    </ol>
</div>


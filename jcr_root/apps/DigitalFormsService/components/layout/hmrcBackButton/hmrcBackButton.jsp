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
<div class="guidetoolbar">

    <c:forEach items="${guideToolbar.items}" var="toolbarItem">
    	<c:if test="${toolbarItem.name ne 'previtemnav'}">
            <div id="${toolbarItem.id}_guide-item">
                <sling:include path="${toolbarItem.path}" resourceType="${toolbarItem.resourceType}"/>
            </div>
        </c:if>


		<c:if test="${toolbarItem.name eq 'previtemnav'}">
            <br>
            <div id="${toolbarItem.id}_guide-item">
            	<c:if test="${!isEditMode}">
                    <div class="guideFieldNode">
                        <a id="back-link" onclick="$('.movePrev').click()" href="javaScript:void(0);" >${toolbarItem.title}</a>
                    </div>
                </c:if>

                <div style="${isEditMode ? '' : 'display: none;'}">
                    <sling:include path="${toolbarItem.path}" resourceType="${toolbarItem.resourceType}"/>
                </div>
            </div>
        </c:if>
    </c:forEach>
</div>

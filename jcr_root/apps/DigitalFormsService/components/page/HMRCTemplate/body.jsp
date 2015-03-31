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
<%@include file="formInfo.jsp"%>

<body>

    <%---------- Do not render header if in HTML preview mode  --------------%>
	<c:if test="<%=hideHeaderFooter == true%>">
    	<cq:include script="header.jsp"/>
    </c:if>


    <%----- Main content of the form is always rendered  ---------%>
    <cq:include script="content.jsp"/>

	<%---------- Do not render footer if in HTML preview mode --------------%>
    <c:if test="<%=hideHeaderFooter == true%>">
        <cq:include script="footer.jsp"/>
    </c:if>
</body>



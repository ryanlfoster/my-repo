<%@page session="false"%><%@ page import="com.day.cq.wcm.foundation.Placeholder" %>
<%--
  Copyright 1997-2009 Day Management AG
  Barfuesserplatz 6, 4001 Basel, Switzerland
  All Rights Reserved.

  This software is the confidential and proprietary information of
  Day Management AG, ("Confidential Information"). You shall not
  disclose such Confidential Information and shall use it only in
  accordance with the terms of the license agreement you entered into
  with Day.

  ==============================================================================

	Errors

--%><%
%>
<%@include file="/libs/foundation/global.jsp"%>

<!-- Error Summary -->

<div class="container global-error-div no-validation-errors" data-dfs-global-errors data-dfs-global-errors-display-on="panel">
    <h4> There are one or more errors in this Form</h4>
    <div class="error-item row" data-dfs-global-error-item>
        <div class="col-md-12">
            <a class="error-text" data-dfs-global-error-text href="javascript:void(0)"></a>
        </div>
    </div>
</div>

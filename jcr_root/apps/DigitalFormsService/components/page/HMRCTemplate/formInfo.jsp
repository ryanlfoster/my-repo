<%@include file="/libs/fd/af/components/guidesglobal.jsp"%>

<%@ page session="false"
    import="com.day.cq.dam.api.Asset,
      	com.day.cq.wcm.webservicesupport.Configuration,
	  	com.day.cq.wcm.webservicesupport.ConfigurationManager,
		org.apache.sling.api.resource.ResourceUtil,
    	org.apache.sling.api.resource.ResourceResolver,
		org.apache.sling.api.resource.ResourceMetadata"
%>
 <sling:defineObjects/>

<%
	String formName = currentPage.getName();
	StringBuffer tokenstr = new StringBuffer();
    tokenstr.append(formName);

    String formTypeRef = tokenstr.toString().replaceAll(" ", "-");

    String path = "/content/dam/formsanddocuments/DigitalAdaptiveForms/"+formTypeRef+"/jcr:content";
    ResourceResolver resolver = slingRequest.getResourceResolver();
    Resource res = resolver.getResource(path);
    Resource md = res.getChild("metadata");
    ValueMap props = md.adaptTo(ValueMap.class);

    String formId = (String)props.get("fmg:form_id");
	String versionNo = (String)props.get("fmg:version");

	Boolean hideHeaderFooter = false;
	String showHeaderAndFooter = request.getParameter("showHeaderAndFooter");
	if(showHeaderAndFooter == "" || showHeaderAndFooter == null || showHeaderAndFooter.isEmpty()) {
    	//No parameter has been received
		hideHeaderFooter = true;
    } else {
     	//Parameter received
        hideHeaderFooter = false;
    }

%>
<%-----------<c:set var="ISHTMLMODE" scope="page" value="<%=(WCMMode.fromRequest(request) == WCMMode.DISABLED)%>"/>---------------%>

<%----------------  This variable is set by the api and is used to turns off the header and footer at render time  -----------------%>
    <%--------<c:set var="ISHTMLMODE" scope="page" value="<=%isHTML%>"/>----------%>

<script>
    //	console.log("hideHeaderFooter: <%=hideHeaderFooter%>")
    //	global vars for form id and form type ref
    var formId = "<%=formId%>";
    var formTypeRef = "<%=formTypeRef%>";

    //	get form title
    var formTitle = "<%=currentPage.getName()%>";

    //	get form version
    var formVersion = "<%=versionNo%>";
</script>


package qa.qcri.aidr.predictui.api;

import java.util.List;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.apache.log4j.Logger;

import qa.qcri.aidr.dbmanager.dto.CustomUiTemplateDTO;
import qa.qcri.aidr.predictui.facade.CustomUITemplateFacade;
import qa.qcri.aidr.predictui.util.ResponseWrapper;
import qa.qcri.aidr.predictui.util.TaggerAPIConfigurationProperty;
import qa.qcri.aidr.predictui.util.TaggerAPIConfigurator;

/**
 * Created with IntelliJ IDEA.
 * User: jlucas
 * Date: 3/20/14
 * Time: 2:27 PM
 * To change this template use File | Settings | File Templates.
 */
@Path("/customuitemplate")
@Stateless
public class CustomUITemplateResource {

    @Context
    private UriInfo context;
    @EJB
    private CustomUITemplateFacade customUITemplateFacade;

    private static Logger logger = Logger.getLogger(CustomUITemplateResource.class);
    
    public CustomUITemplateResource(){

    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response addNewTemplate(CustomUiTemplateDTO customUITemplate) {
        boolean isUpdate = false;
        CustomUiTemplateDTO dbTemplate = null;
        int type = customUITemplate.getTemplateType();
        if(!isAttributeInfoRequired(type)){
            List<CustomUiTemplateDTO> templates = customUITemplateFacade.getCustomUITemplateBasedOnTypeByCrisisID(customUITemplate.getCrisisID(), customUITemplate.getTemplateType());
            logger.info("templates size : " + templates.size());
            if(templates.size() > 0){
                isUpdate = true;
                dbTemplate = templates.get(0);
            }
        }
        else{
            List<CustomUiTemplateDTO> templates = customUITemplateFacade.getCustomUITemplateBasedOnTypeByCrisisIDAndAttributeID(customUITemplate.getCrisisID(),customUITemplate.getNominalAttributeID(), customUITemplate.getTemplateType());
            logger.info("templates size : " + templates.size());
            if(templates.size() > 0){
                isUpdate = true;
                dbTemplate = templates.get(0);
            }
        }

        CustomUiTemplateDTO addedTemplate = null;
        logger.info("isUpdate : " + isUpdate);

        if(isUpdate) {
            addedTemplate = customUITemplateFacade.updateCustomUITemplate(dbTemplate, customUITemplate) ;
            logger.info(addedTemplate.getCrisisID());
            return Response.ok(addedTemplate).build();
        }
        else{
            addedTemplate = customUITemplateFacade.addCustomUITemplate(customUITemplate);
        }

        return Response.ok(addedTemplate).build();

    }


    @GET
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/crisisID/{crisisID}")
    public Response getCrisisByCode(@PathParam("crisisID") int crisisID) {

        List<CustomUiTemplateDTO> customUITemplate = null;

        try {
            customUITemplate = customUITemplateFacade.getAllCustomUITemplateByCrisisID((long) crisisID);
        } catch (RuntimeException e) {
            return Response.ok(new ResponseWrapper(TaggerAPIConfigurator.getInstance().getProperty(TaggerAPIConfigurationProperty.STATUS_CODE_FAILED), e.getCause().getCause().getMessage())).build();
        }

        return Response.ok(customUITemplate).build();
    }


    @GET
    @Produces("application/json")
    @Path("/tester")
    public Response ping() {
        String response = "{\"application\":\"aidr-tagger-api\", \"status\":\"RUNNING\"}";
        return Response.ok(response).build();

        ///landingpage/crisisID/
    }

    private boolean isAttributeInfoRequired(int type){
        boolean returnValue = false;

        if(type == Integer.parseInt(TaggerAPIConfigurator.getInstance().getProperty(TaggerAPIConfigurationProperty.CLASSIFIER_DESCRIPTION_PAGE))){
            returnValue = true;
        }

        if(type == Integer.parseInt(TaggerAPIConfigurator.getInstance().getProperty(TaggerAPIConfigurationProperty.CLASSIFIER_TUTORIAL_ONE))){
            returnValue = true;
        }

        if(type == Integer.parseInt(TaggerAPIConfigurator.getInstance().getProperty(TaggerAPIConfigurationProperty.CLASSIFIER_TUTORIAL_TWO))){
            returnValue = true;
        } 

        return returnValue;
    }

}

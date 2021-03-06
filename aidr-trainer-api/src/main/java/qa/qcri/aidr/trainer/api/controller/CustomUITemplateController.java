package qa.qcri.aidr.trainer.api.controller;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import qa.qcri.aidr.dbmanager.dto.CustomUiTemplateDTO;
import qa.qcri.aidr.dbmanager.entities.misc.CustomUiTemplate;
import qa.qcri.aidr.trainer.api.service.CustomUITemplateService;
import qa.qcri.aidr.trainer.api.store.CodeLookUp;

/**
 * Created with IntelliJ IDEA.
 * User: jlucas
 * Date: 4/4/14
 * Time: 5:24 PM
 * To change this template use File | Settings | File Templates.
 */
@Path("/customUI")
@Component
public class CustomUITemplateController {

    protected static Logger logger = Logger.getLogger(CustomUITemplateController.class);

    @Autowired
    private CustomUITemplateService customUITemplateService;

    @GET
    @Produces( MediaType.APPLICATION_JSON )
    @Path("/get/LandingPage/{crisisID}")
    public List<CustomUiTemplate> getLandingUIByID(@PathParam("crisisID") Long crisisID){
        return  customUITemplateService.getCustomTemplateForLandingPage(crisisID);
    }

    @GET
    @Produces( MediaType.APPLICATION_JSON )
    @Path("/get/customUI/{crisisID}")
    public List<CustomUiTemplate> getCustomUIByID(@PathParam("crisisID") Long crisisID){
        logger.info("[getCustomUIByID] Received request for crisisID = " + crisisID);
    	return  customUITemplateService.getCustomTemplateForLandingPage(crisisID);
    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/welcome/update")
    public void updateWelcomePage(String data){
        //logger.debug("updateWelcomePage start: " + new Date());
        //logger.debug("updateWelcomePage..: " + data);
        //updateCustomTemplateByAttribute(Long crisisID, Long attributeID, int customUIType, int skinType)
        try{
            //logger.debug("updateWelcomePage. before parse: " + data);
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(data);

            JSONObject jsonObject = (JSONObject)obj;

            Long crisisID = (Long)jsonObject.get("crisisID");


            Long attributeID = (Long)jsonObject.get("nominalAttributeID");


            int customUIType = ((Long)jsonObject.get("templateType")).intValue();


            //logger.debug("crisisID..: " + crisisID);
            //logger.debug("attributeID..: " + attributeID);
            //logger.debug("customUIType..: " + customUIType);

            customUITemplateService.updateCustomTemplateByAttribute(crisisID,attributeID,customUIType,0);

        }
        catch(Exception e){
            logger.debug("Exception while updating welcome page " + data,e);
        }
    }


    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/tutorial/update")
    public void updateTutorial(String data){
        //logger.debug("updateTutorial start: " + new Date());
        //logger.debug("updateTutorial..: " + data);

        try{
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(data);

            JSONObject jsonObject = (JSONObject)obj;

            long crisisID = (Long)jsonObject.get("crisisID");
            long attributeID = (Long)jsonObject.get("nominalAttributeID");
            int customUIType = ((Long)jsonObject.get("templateType")).intValue();
            int skinType = CodeLookUp.DEFAULT_SKIN;
            List<CustomUiTemplateDTO> templates = customUITemplateService.getCustomTemplateSkinType(crisisID);

            if(templates.size() > 0){
            	CustomUiTemplateDTO c = templates.get(0);
                skinType = Integer.parseInt(c.getTemplateValue());
            }

            customUITemplateService.updateCustomTemplateByAttribute(crisisID,attributeID,customUIType,skinType);

        }
        catch(Exception e){
            logger.debug("Exception while updating tutorial " + data,e);
        }

        //updateCustomTemplateByAttribute(Long crisisID, Long attributeID, int customUIType, int skinType)

    }

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Path("/skin/update")
    public void updateSkin(String data){
        //logger.debug("updateSkin start: " + new Date());
        //logger.debug("updateSkin..: " + data);

        try{
            JSONParser parser = new JSONParser();
            Object obj = parser.parse(data);

            JSONObject jsonObject = (JSONObject)obj;

            long crisisID = (Long)jsonObject.get("crisisID");
            long attributeID = 0;
            int customUIType = ((Long)jsonObject.get("templateType")).intValue();
            int skinType = CodeLookUp.DEFAULT_SKIN;
            List<CustomUiTemplateDTO> templates = customUITemplateService.getCustomTemplateSkinType(crisisID);

            if(templates.size() > 0){
            	CustomUiTemplateDTO c = templates.get(0);
                skinType = Integer.parseInt(c.getTemplateValue());
            }

            customUITemplateService.updateCustomTemplateByAttribute(crisisID,attributeID,customUIType,skinType);

        }
        catch(Exception e){
            logger.debug("Exception while updating skin " + data,e);
        }

        //updateCustomTemplateByAttribute(Long crisisID, Long attributeID, int customUIType, int skinType)

    }


    // update landing page
    // update tutorial
    // update long description
}

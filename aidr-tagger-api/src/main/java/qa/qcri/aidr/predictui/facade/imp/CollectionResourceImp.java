/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package qa.qcri.aidr.predictui.facade.imp;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.apache.log4j.Logger;

import qa.qcri.aidr.dbmanager.entities.misc.Collection;
import qa.qcri.aidr.dbmanager.entities.misc.Users;
import qa.qcri.aidr.predictui.facade.CollectionResourceFacade;

/**
 *
 * @author Imran
 */
@Stateless
public class CollectionResourceImp implements CollectionResourceFacade {

	private Logger logger = Logger.getLogger(CollectionResourceImp.class);
	
	@PersistenceContext(unitName = "qa.qcri.aidr.collectorManager-PU")
	private EntityManager em;

	public List<Collection> getAllRunningCollectionsByUserID(int userID) {
		List<Collection> collections = new ArrayList<Collection>();
		Query q = em.createNativeQuery("SELECT id, code, name, owner_id "
				+ " FROM collection"
				+ " WHERE owner_id = :user_id AND status = 0");    
		q.setParameter("user_id", + userID );
		try {
			List<Object[]> queryRes = q.getResultList();
			Collection collection;
			for (Object[] row : queryRes) {
				collection =  new Collection();
				collection.setCrisisId(( (BigInteger)row[0]).longValue());
				collection.setCode((String) row[1]);
				collection.setName((String) row[2]);
				Users user = new Users();
				user.setId(((BigInteger)row[3]).longValue());
				collection.setOwner(user);
				collections.add(collection);
			}

			return collections;
		} catch (NoResultException e) {
			logger.warn("No result.");
			return null;
		}
	}
}

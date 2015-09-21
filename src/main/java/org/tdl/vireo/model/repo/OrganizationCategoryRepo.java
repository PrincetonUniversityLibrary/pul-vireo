package org.tdl.vireo.model.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.tdl.vireo.model.OrganizationCategory;

@Repository
public interface OrganizationCategoryRepo extends JpaRepository<OrganizationCategory, Long> {

}

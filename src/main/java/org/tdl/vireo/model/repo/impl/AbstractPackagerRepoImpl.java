package org.tdl.vireo.model.repo.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.tdl.vireo.model.formatter.AbstractFormatter;
import org.tdl.vireo.model.packager.DSpaceMetsPackager;
import org.tdl.vireo.model.packager.Packager;
import org.tdl.vireo.model.packager.ProQuestUmiPackager;
import org.tdl.vireo.model.repo.AbstractPackagerRepo;
import org.tdl.vireo.model.repo.custom.AbstractPackagerRepoCustom;

public class AbstractPackagerRepoImpl implements AbstractPackagerRepoCustom {

    @Autowired
    private AbstractPackagerRepo abstractPackagerRepo;

    @Override
    public Packager createDSpaceMetsPackager(String name, AbstractFormatter formatter) {
        return abstractPackagerRepo.save(new DSpaceMetsPackager(name, formatter));
    }

    @Override
    public Packager createProQuestUmiPackager(String name, AbstractFormatter formatter) {
        return abstractPackagerRepo.save(new ProQuestUmiPackager(name, formatter));
    }

}

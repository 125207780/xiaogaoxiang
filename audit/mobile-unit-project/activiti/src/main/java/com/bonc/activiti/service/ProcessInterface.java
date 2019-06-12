package com.bonc.activiti.service;

import com.bonc.activiti.entity.LocalProcessVariables;


public interface ProcessInterface {

	void updateProjectPhase(String taskPeriod, LocalProcessVariables localProcessVariables);
}

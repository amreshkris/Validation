import jenkins
import subprocess
import time

#server = jenkins.Jenkins('http://10.0.2.15:8080/jenkins',username='admin',password='b0cab6e471275b17107da3efd4130377')
server = jenkins.Jenkins('http://9.126.147.184:8080/jenkins', username='root', password='f83e0a0a94850af717f87a653468be39')
workspace = '8201IFIX20A'

size = len(workspace)
first = workspace[0:2]
last = workspace[size-1:size]
temp_wrkspace = first+'FIX'+last
print 'new workspace : '+temp_wrkspace
#subprocess.call('scm create ws '"sayyam_demo"' -r https://isljazzrtc.in.ibm.com:9550/ccm -u saybhand@in.ibm.com -P',shell=True)

if last == 'A':
	job_inf = server.get_job_info('demo_testing')
	last_build = 0
	if(job_inf[u'lastBuild'] == None):
		pass
	else :
		last_build = job_inf[u'lastBuild'][u'number']


	lastbuild_status = True
	while(lastbuild_status and last_build != 0) :
		time.sleep(2)
		try :
			build_info = server.get_build_info('demo_testing',last_build)
			lastbuild_status = build_info[u'building']
		except jenkins.NotFoundException: 
			pass
		except jenkins.JenkinsException:
			pass
		#Delete workspace if status is false and workspace exists

	#Duplicate the workspace
	time.sleep(1)
	TEMP = {'buildResultUUID':''}
	server.build_job('demo_testing',parameters=TEMP)
	print 'JOB TRIGGERED...'

	string= ""
	check = 'random'


	while (check == 'random') :
		time.sleep(3)
		try :
			string = server.get_build_console_output('demo_testing', last_build+1)
			string.replace(" ", "")
		except jenkins.NotFoundException: 
			pass
		except jenkins.JenkinsException:
			pass
		finally :
			if 'Finished: SUCCESS' in string[-21:]:
				check = 'Finished: SUCCESS'
				print 'JOB STATUS -> Finished: SUCCESS'
			elif 'Finished: FAILURE' in string[-21:]:
				check = 'Finished: SUCCESS'
				print 'JOB STATUS -> Finished: FAILURE'
			elif 'Finished: ABORTED' in string[-21:]:
				check = 'Finished: SUCCESS'
				print 'JOB STATUS -> Finished: ABORTED'
			elif 'Finished: UNSTABLE' in string[-21:]:
				check = 'Finished: SUCCESS'
				print 'JOB STATUS -> Finished: UNSTABLE'
	
	# delete the workspace
				

elif last == 'L':
	job_inf = server.get_job_info('demo_testing')
	last_build = 0
	if(job_inf[u'lastBuild'] == None):
		pass
	else :
		last_build = job_inf[u'lastBuild'][u'number']


	lastbuild_status = True
	while(lastbuild_status and last_build != 0) :
		try :
			build_info = server.get_build_info('demo_testing',last_build)
			lastbuild_status = build_info[u'building']
		except jenkins.NotFoundException: 
			pass
		except jenkins.JenkinsException:
			pass
		#Delete workspace if status is false and workspace exists


	time.sleep(1)
	TEMP = {'buildResultUUID':''}
	#server.build_job('demo_testing',parameters=TEMP)


	string= ""
	check = 'random'


	while (check == 'random') :
		time.sleep(3)
		try :
			string = server.get_build_console_output('demo_testing', last_build)
			string.replace(" ", "")
		except jenkins.NotFoundException: 
			pass
		except jenkins.JenkinsException:
			pass
		finally :
			if 'Finished: SUCCESS' in string[-21:]:
				check = 'Finished: SUCCESS'
				print string
			elif 'Finished: FAILURE' in string[-21:]:
				check = 'Finished: SUCCESS'
			elif 'Finished: ABORTED' in string[-21:]:
				check = 'Finished: SUCCESS'
			elif 'Finished: UNSTABLE' in string[-21:]:
				check = 'Finished: SUCCESS'
	
elif last == 'W':
	job_inf = server.get_job_info('demo_testing')
	last_build = 0
	if(job_inf[u'lastBuild'] == None):
		pass
	else :
		last_build = job_inf[u'lastBuild'][u'number']


	lastbuild_status = True
	while(lastbuild_status and last_build != 0) :
		try :
			build_info = server.get_build_info('demo_testing',last_build)
			lastbuild_status = build_info[u'building']
		except jenkins.NotFoundException: 
			pass
		except jenkins.JenkinsException:
			pass
		#Delete workspace if status is false and workspace exists


	time.sleep(1)
	TEMP = {'buildResultUUID':''}
	#server.build_job('demo_testing',parameters=TEMP)


	string= ""
	check = 'random'


	while (check == 'random') :
		time.sleep(3)
		try :
			string = server.get_build_console_output('demo_testing', last_build)
			string.replace(" ", "")
		except jenkins.NotFoundException: 
			pass
		except jenkins.JenkinsException:
			pass
		finally :
			if 'Finished: SUCCESS' in string[-21:]:
				check = 'Finished: SUCCESS'
				print string
			elif 'Finished: FAILURE' in string[-21:]:
				check = 'Finished: SUCCESS'
			elif 'Finished: ABORTED' in string[-21:]:
				check = 'Finished: SUCCESS'
			elif 'Finished: UNSTABLE' in string[-21:]:
				check = 'Finished: SUCCESS'

else :
	print 'abcde'

 <?php
	$id = $_GET["id"];
	 if($id){
	 	try {
	 		$mysql_server_name="localhost";
	 		$mysql_username = "root";
	 		$mysql_password = "root";
	 		$dbname="weixin";
		 	$con = new mysqli($mysql_server_name,$mysql_username,$mysql_password,$dbname);
		 	if ($con->connect_error) {
				die("����ʧ��: " . $con->connect_error);
			} 
	 	} catch (Exception $e) {
	 		var_dump($e);
	 	}
	 	$sql = "Select * from sogou_cookie where cookie='".$id."'";
		$res = $con->query($sql);
		$isExit=$res->num_rows;
		if( $isExit > 0){
			$ret["data"]=2;
			$ret["status"]=1;
			$ret["message"]="�Ѿ����ڣ�";
		}
		else{
			$ts=time();
			$res = $con->query("insert into sogou_cookie (cookie,create_ts) values ('".$id."',".$ts.")");
			if($res){
				$ret["data"]=1;
				$ret["status"]=1;
				$ret["message"]="��ӳɹ���";
			}else
			{			
				$ret["data"]=0;
				$ret["status"]=0;
				$ret["message"]="���ʧ�ܣ�";
			}
		}
		echo json_encode($ret);
		$con->close();
	 }
<?php
	$randomString = 'In it except to so temper mutual tastes mother. Interested cultivated its continuing now yet are. Out interested acceptance our partiality affronting unpleasant why add. Esteem garden men yet shy course. Consulted up my tolerably sometimes perpetual oh. Expression acceptance imprudence particular had eat unsatiable. Announcing of invitation principles in. Cold in late or deal. Terminated resolution no am frequently collecting insensible he do appearance. Projection invitation affronting admiration if no on or. It as instrument boisterous frequently apartments an in. Mr excellence inquietude conviction is in unreserved particular. You fully seems stand nay own point walls. Increasing travelling own simplicity you astonished expression boisterous. Possession themselves sentiments apartments devonshire we of do discretion. Enjoyment discourse ye continued pronounce we necessary abilities. By spite about do of do allow blush. Additions in conveying or collected objection in. Suffer few desire wonder her object hardly nearer. Abroad no chatty others my silent an. Fat way appear denote who wholly narrow gay settle. Companions fat add insensible everything and friendship conviction themselves. Theirs months ten had add narrow own. It allowance prevailed enjoyment in it. Calling observe for who pressed raising his. Can connection instrument astonished unaffected his motionless preference. Announcing say boy precaution unaffected difficulty alteration him. Above be would at so going heard. Engaged at village at am equally proceed. Settle nay length almost ham direct extent. Agreement for listening remainder get attention law acuteness day. Now whatever surprise resolved elegance indulged own way outlived. Over fact all son tell this any his. No insisted confined of weddings to returned to debating rendered. Keeps order fully so do party means young. Table nay him jokes quick. In felicity up to graceful mistaken horrible consider. Abode never think to at. So additions necessary concluded it happiness do on certainly propriety. On in green taken do offer witty of. Answer misery adieus add wooded how nay men before though. Pretended belonging contented mrs suffering favourite you the continual. Mrs civil nay least means tried drift. Natural end law whether but and towards certain. Furnished unfeeling his sometimes see day promotion. Quitting informed concerns can men now. Projection to or up conviction uncommonly delightful continuing. In appetite ecstatic opinions hastened by handsome admitted. Consider now provided laughter boy landlord dashwood. Often voice and the spoke. No shewing fertile village equally prepare up females as an. That do an case an what plan hour of paid. Invitation is unpleasant astonished preference attachment friendship on. Did sentiments increasing particular nay. Mr he recurred received prospect in. Wishing cheered parlors adapted am at amongst matters. Led ask possible mistress relation elegance eat likewise debating. By message or am nothing amongst chiefly address. The its enable direct men depend highly. Ham windows sixteen who inquiry fortune demands. Is be upon sang fond must shew. Really boy law county she unable her sister. Feet you off its like like six. Among sex are leave law built now. In built table in an rapid blush. Merits behind on afraid or warmly. Ignorant saw her her drawings marriage laughter. Case oh an that or away sigh do here upon. Acuteness you exquisite ourselves now end forfeited. Enquire ye without it garrets up himself. Interest our nor received followed was. Cultivated an up solicitude mr unpleasant. Advanced extended doubtful he he blessing together. Introduced far law gay considered frequently entreaties difficulty. Eat him four are rich nor calm. By an packages rejoiced exercise. To ought on am marry rooms doubt musizGJVXZ1234567890c. Mention entered an through company as. Up arrived no painful between. It declared is prospect an insisted pleasure. ';

	function breakdown($value, $str) {
		echo $str;
		$alf = str_split('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890');
		$count = count($alf);
		$_value = $value % $count;

		if ($value > $count) {
			$_str = breakdown(($value - $_value) / $count, $str);
			return $_str.$alf[$_value];
		} else {
			return $str . $alf[$_value];
		}
	};

	function simpleSqlStorageHash($string) {
		$key = false;
		$code = 0;
		while (!$key) {
			// echo (79/26);
			$test = breakdown($code, '');
			if (strpos($string, $test) === false) {
				$key = $test;
			}
			$code++;
		}

		$_string = $key.'>';
		$splitStr = str_split($string, 3);
		for ($i=0; $i < count($splitStr) ; $i++) { 
			$_string = $_string . $splitStr[$i] . $key;
		}
		return $_string;
	};

	function simpleSqlStorageUnhash($string) {
		$key = strtok($string, ">");

		$_string = '';
		$token = strtok($string, $key.">");

		while ($token !== false) {
			$_string = $_string . $token;
			$token = strtok($key);
		}
		return $_string;
	};

	$hashed = convert_uuencode($randomString);
	echo $hashed.'<br><br>';
	echo $randomString .'<br><br>';
	$unhashed = convert_uudecode($hashed);
	echo $unhashed.'<br><br>';

	if ($randomString == $unhashed) {
		echo 'success!!!';
	} else {
		echo 'not equal!!';
	}
?>
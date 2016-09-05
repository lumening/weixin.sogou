DROP TABLE IF EXISTS `sogou_cookie`;
CREATE TABLE `sogou_cookie` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cookie` varchar(64) DEFAULT NULL,
  `create_ts` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=42350 DEFAULT CHARSET=utf8;

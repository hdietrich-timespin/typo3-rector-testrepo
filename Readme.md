TEST
====

You can start rector process with:

```
cd /path_to/hdietrich-timespin/typo3-rector-testrepo
```
```
composer install
```
```
cd Projects/Typo3_12
```
```
php ../../vendor/bin/rector  process typo3conf/ext/t3tstest/Classes --dry-run -vvv --debug
```
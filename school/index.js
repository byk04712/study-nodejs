const classes = require('./classes');

// 添加班级
classes.addClass('张老师', ['小明', '小红', '小李']);

// 添加学校
classes.addSchool(
	[
		{
			teacherName: '王老师',
			studentNames: ['学生1', '学生2', '学生3']
		},
		{
			teacherName: '苍老师',
			studentNames: ['学生甲', '学生乙', '学生丙']
		}
	]
);

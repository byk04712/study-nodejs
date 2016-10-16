const student = require('./student');
const teacher = require('./teacher');

/**
 * 添加老师和班级
 * @param {[type]} teacherName  老师名称
 * @param {[type]} students 学生数组
 */
function addClass(teacherName, students) {
	teacher.add(teacherName);

	students.forEach((stuName, index) => {
		student.add(stuName);
	});
}

/**
 * 添加学校
 */
function addSchool(school) {
	school.forEach((item, index) => {
		teacher.add(item.teacherName);

		item.studentNames.forEach((stu) => {
			student.add(stu);
		});
	});
}

/**
 * 班级模块
 */
exports.addClass = addClass;
exports.addSchool = addSchool;
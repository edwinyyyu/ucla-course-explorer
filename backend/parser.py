import os

def load_courses(lines, start, end):
    for i in range(start, end):
        if lines[i].startswith("Units: "):
            course_id = lines[i - 1].strip()

def parse_data(file):
    lines = file.readlines()
    
    lower_div_mark = -1
    upper_div_mark = -1
    graduate_mark = -1
    for i in range(len(lines)):
        if lines[i].startswith("Lower Division Courses"):
            lower_div_mark = i
            continue
        if lines[i].startswith("Upper Division Courses"):
            upper_div_mark = i
            continue
        if lines[i].startswith("Graduate Courses"):
            graduate_mark = i
            continue
    
    course_level = "lower division"
    for i in range(lower_div_mark + 1, upper_div_mark):
        if lines[i].startswith("Units: "):
            course_id = lines[i - 1]
    
    course_level = "upper division"
    for i in range(upper_div_mark + 1, graduate_mark):
        if lines[i].startswith("Units: "):
            course_id = lines[i - 1]
    
    course_level = "graduate"
    for i in range(graduate_mark + 1, len(lines)):
        if lines[i].startswith("Units: "):
            course_id = lines[i - 1]
    

# main
directory = "course-descriptions-data"

for filename in os.listdir(directory):
    with open(directory + "/" + filename, "r") as f:
        parse_data(f)

with open("course-descriptions-data/computer_science.txt", "r") as f:
    parse_data(f)

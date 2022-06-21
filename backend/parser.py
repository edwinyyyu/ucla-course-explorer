import os

def load_courses(lines, start, end):
    for i in range(start, end):
        if lines[i].startswith("Units: "):
            course_id = lines[i - 1].strip()

def parse_data(file):
    lines = [line.strip() for line in file.readlines()]
    course_subject = lines[0].strip()
    course_level = ""
    
    for i in range(len(lines)):
        if lines[i].startswith("Lower Division Courses"):
            course_level = "lower division"
            continue
        elif lines[i].startswith("Upper Division Courses"):
            course_level = "upper division"
            continue
        elif lines[i].startswith("Graduate Courses"):
            course_level = "graduate division"
            continue
    
        if lines[i].startswith("Units: "):
            course_number = lines[i - 1][ : lines[i - 1].find(".")]
            course_name = lines[i - 1][lines[i - 1].find(" ") + 1 : ]
            num_units = lines[i][lines[i].find(" ") + 1 : ]
            
            print(course_number)
            print(course_name)
            print(num_units)

# main
directory = "course-descriptions-data"

#for filename in os.listdir(directory):
#    with open(directory + "/" + filename, "r") as f:
#        parse_data(f)

with open("course-descriptions-data/computer_science.txt", "r") as f:
    parse_data(f)

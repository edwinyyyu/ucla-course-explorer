import os

def is_course_number(word):
    if word[0] == "C" or word[0] == "M":
        word = word[1 : ]
    return word[0].isdecimal()

def determine_subject(extracted_words, course_index):
    return "FILLER"

def determine_requisites(description):
    requisites = {}
    
    while "equisite: " in description or "equisites: " in description:
        single_index = description.find("equisite: ") + 10
        plural_index = description.find("equisites: ") + 11
        
        start_index = min(single_index, plural_index)
        if single_index == 10 - 1:
            start_index = plural_index
        elif plural_index == 11 - 1:
            start_index = single_index
        description = description[start_index : ]
        end_index = description.find(".")
        
        extracted_words = description[ : end_index]
        words = [word.strip(",.;:") for word in extracted_words.split()]
        for i in range(len(words)):
            word = words[i]
            if is_course_number(word):
                subject_area = determine_subject(extracted_words, i)
                requisites.setdefault(subject_area, []).append(word)
    
    print(requisites)
    return requisites

def parse_course_data(file):
    lines = [line.strip() for line in file.readlines()]
    subject_area = lines[0].strip()
    level = ""
    
    for i in range(len(lines)):
        if lines[i].startswith("Lower Division Courses"):
            level = "lower division"
            continue
        elif lines[i].startswith("Upper Division Courses"):
            level = "upper division"
            continue
        elif lines[i].startswith("Graduate Courses"):
            level = "graduate"
            continue
    
        if lines[i].startswith("Units: "):
            number = lines[i - 1][ : lines[i - 1].find(".")]
            name = lines[i - 1][lines[i - 1].find(" ") + 1 : ]
            num_units = lines[i][lines[i].find(" ") + 1 : ]
            description = lines[i + 1]
            requisites = determine_requisites(description)

# main
directory = "course-descriptions-data"

#for filename in os.listdir(directory):
#    with open(directory + "/" + filename, "r") as f:
#        parse_course_data(f)

with open("course-descriptions-data/computer_science.txt", "r") as f:
    parse_course_data(f)

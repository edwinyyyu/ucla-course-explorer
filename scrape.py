from selenium import webdriver
from selenium.webdriver.common.keys import Keys

from bs4 import BeautifulSoup

import time

SUBJECT_URL = "https://registrar.ucla.edu/academics/course-descriptions"
COURSES_URL = "https://registrar.ucla.edu/academics/course-descriptions?search="

def get_html(url):
    parent_window = driver.current_window_handle
    driver.switch_to.new_window("tab")
    
    driver.get(url)
    time.sleep(1)
    html = driver.page_source
    
    driver.close()
    driver.switch_to.window(parent_window)
    
    return html

def scrape_subject_areas():
    url = SUBJECT_URL
    
    html = get_html(url)

def scrape_courses(subject_area):
    url_appendage = subject_area.replace(" ", "+")
    url = COURSES_URL + url_appendage
    
    html = get_html(url)
    
    start_str = '<div class="course-descriptions-subject-area">'
    end_str = '<div class="page-menu">'
    start_index = html.find(start_str)
    end_index = html.find(end_str)
    
    html = html[start_index: end_index]
    soup = BeautifulSoup(html, "html.parser")
    
    path = "course-descriptions-html/"
    filename = path + subject_area.replace(" ", "_").lower() + ".txt"
    f = open(filename, "w+")
    f.write(soup.prettify())
    f.close()
    
    #course_substring
    #for course_substring in html

# main
driver = webdriver.Firefox()

scrape_courses("Electrical and Computer Engineering")

driver.quit()

from setuptools import setup, find_packages

setup(
    name="spacedeck-zerebro-harness",
    version="1.0.0",
    packages=find_packages(),
    install_requires=[
        "spacedeck-sdk>=0.1.0",
        "pydantic>=2.0.0",
    ],
    description="Autonomous Settlement Protocol harness for Zerebro agents.",
)
